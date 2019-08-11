import fetch from "redir-core/lib/redir/result/fetch";
import getStdin from "get-stdin";
import Logger, { configure, Level } from "nightingale";
import { Command, flags } from "@oclif/command";
import { CommandAgent } from "../redir/CommandAgent";
import { DefaultContext, StringIO } from "redir-core";
import { Pipeline } from "redir-core/lib/redir/pipeline/Pipeline";
import { PipelineBuilder } from "redir-core/lib/redir/pipeline/builder/PipelineBuilder";
import { redir } from "../redir/redir";
import {
  ResultTarget,
  ResultTargetType
} from "redir-core/lib/redir/ResultTarget";
import { StageBuilder } from "redir-core/lib/redir/pipeline/builder/StageBuilder";
import ConsoleHandler from "nightingale-console";

const logger = new Logger("cli:run");
configure([{ handlers: [new ConsoleHandler(Level.DEBUG)] }]);

export default class Run extends Command {
  static description = "Execute a redir script";

  static flags = {
    help: flags.help({ char: "h" }),
    fetch: flags.boolean({ description: "Pass result to fetch" })
  };

  static args = [
    {
      name: "name",
      required: true,
      description: "name of the script to run"
    }
  ];

  static strict = false;

  async run() {
    const { args, argv, flags } = this.parse(Run),
      input = getStdin().then(str => new StringIO(str));

    const pipeline = await this.buildPipeline(argv);
    logger.debug("pipeline:", pipeline);

    const context = new DefaultContext(new CommandAgent(this));
    try {
      let result = pipeline.run(input, context);
      if (flags.fetch) {
        const output = await result;
        logger.debug(`calling fetch: ${output.toString()}`);
        result = fetch(result, context, { fetch: true });
      }

      const finalResult = await result;
      this.log(finalResult.toString());
    } catch (err) {
      this.error(`Error running command \`${args.name}\`: ${err.message}`);
      this.exit(1);
    }
  }

  async buildPipeline(argv: string[]): Promise<Pipeline> {
    const builder = new PipelineBuilder(redir);

    let stage: StageBuilder | null = null;
    for (let scriptName of argv) {
      if (stage == null) {
        stage = builder.currentStage();
      } else {
        stage = builder.nextStage();
      }
      const multi = scriptName.split(",");
      for (let spec of multi) {
        const components = spec.split("@"),
          scriptName = components[0];

        let resultTarget =
          components.length > 1
            ? new ResultTarget(components[1], ResultTargetType.Context)
            : new ResultTarget(scriptName, ResultTargetType.Output);

        logger.debug("result target:", { scriptName, resultTarget });
        await stage.addScriptName(scriptName, resultTarget);
      }
    }

    return builder.build();
  }
}
