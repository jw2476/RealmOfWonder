import { glob } from "glob";
import { Message } from "discord.js";
import Command from "./cmd/command";
import db from "./db";

const commands: Array<Command> = [];

export function initCommands() {
  glob("dist/cmd/*.js", (err, files) => {
    const cmds = files.filter((file) => !file.includes("command"));

    for (const cmd of cmds) {
      const splitFile = cmd.split("/");
      const name = "./cmd/" + splitFile[splitFile.length - 1];

      const command = require(name).default;
      commands.push(new command());
    }
  });
}

export default async function handle(msg: Message) {
  if (msg.author.bot) return;

  let prefix = "w!";

  if (msg.guild) {
    const prefixQuery = await db.query("SELECT * FROM guilds WHERE id = $1", [
      msg.guild.id,
    ]);
    prefix = prefixQuery.rows[0].prefix;
  }

  if (!msg.content.startsWith(prefix)) return;

  const cmd = msg.content.substr(prefix.length);

  for (const command of commands) {
    for (const name of command.names) {
      if (cmd.startsWith(name)) {
        await command.handle(msg);
        return;
      }
    }
  }
}
