import { Command, flags } from "@oclif/command";
import glob from "glob";
import { basename, join } from "path";
import { LocalFilesystemScriptResolver } from "redir-core/lib/redir/LocalFilesystemScriptResolver";

export default class Scripts extends Command {
  static description = "List available scripts";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(Scripts),
      fsResolver = LocalFilesystemScriptResolver.defaultResolver();

    glob(join(fsResolver.scriptsDir, "**", "*.js"), (err, matches): void => {
      if (err) {
        this.error(`Error listing scripts: ${err.message}`);
        this.exit(1);
      } else {
        for (let fn of matches) {
          this.log(basename(fn, ".js"));
        }
      }
    });
  }
}
