import * as fs from "fs";
import { Command, flags } from "@oclif/command";
import { exec } from "child_process";
import { LocalFilesystemScriptResolver } from "redir-core/lib/redir/LocalFilesystemScriptResolver";

function ensureProject() {
  const resolver = LocalFilesystemScriptResolver.defaultResolver();
  const dir = resolver.scriptsDir;
  return new Promise((resolve, reject) =>
    fs.access(dir, fs.constants.F_OK | fs.constants.W_OK, err => {
      if (err && err.code === "ENOENT") {
        fs.mkdir(dir, { recursive: true }, err =>
          err ? reject(err) : resolve()
        );
      } else {
        resolve();
      }
    })
  );
}

export default class Edit extends Command {
  static description = "Edit a redir script";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [
    {
      name: "name",
      required: true,
      description: "name of the script"
    }
  ];

  async run() {
    const { args, flags } = this.parse(Edit);

    const editor = process.env.REDIR_EDITOR || process.env.EDITOR;
    if (!editor) {
      this.error(`No editor defined in REDIR_EDITOR or EDITOR`);
      this.exit(1);
      return;
    }

    await ensureProject();

    const fsResolver = LocalFilesystemScriptResolver.defaultResolver(),
      scriptFile = fsResolver.getScriptFile(args.name),
      { stdout, stderr } = exec(`${editor} ${scriptFile}`);

    stdout.setEncoding("utf-8").on("data", data => console.log(data));
    stderr
      .setEncoding("utf-8")
      .on("data", data => console.log("[STDERR]", data));
  }
}
