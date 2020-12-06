import { Message } from "discord.js";
import Command from "./command";
import db from "../db";

export default class Prefix implements Command {
  names = ["prefix"];

  async handle(msg: Message) {
    if (msg.guild) {
      const prefix = msg.content.split(" ")[1];

      if (!prefix) {
        await msg.reply("Please provide a new prefix!");
        return;
      }

      await db.query("UPDATE guilds SET prefix = $1 WHERE id = $2", [
        prefix,
        msg.guild.id,
      ]);

      await msg.reply(`Updated prefix to ${prefix}`);
    } else {
      await msg.reply("Please do this in a server");
    }
  }
}
