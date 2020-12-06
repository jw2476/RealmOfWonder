import Command from "./command";
import { Message } from "discord.js";
import db from "../db";
import Character from "../models/character";
import User from "../models/user";

export default class Create implements Command {
  names = ["create"];

  async handle(msg: Message) {
    const charName = msg.content.split(" ")[1];

    if (!charName) {
      await msg.reply("Please supply a name for your character");
      return;
    }

    await new Character(msg.author.id, charName).insert();
    await msg.reply(`A character called ${charName} has been created!`);

    const userQuery = await db.query("SELECT * FROM users WHERE id = $1", [
      msg.author.id,
    ]);

    if (!userQuery.rows.length) {
      await new User(msg.author.id).insert();
    }
  }
}
