import { Message } from "discord.js";

export default interface Command {
  names: Array<string>;

  handle(msg: Message): void;
}
