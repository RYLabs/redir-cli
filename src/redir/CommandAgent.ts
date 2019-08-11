import { UserAgent } from "redir-core";
import Command from "@oclif/command";

export class CommandAgent implements UserAgent {
  name = "redis-cli";
  command: Command;

  constructor(command: Command) {
    this.command = command;
  }
}
