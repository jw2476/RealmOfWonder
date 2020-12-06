import Command from "./command";
import { Message } from "discord.js";
import db from "../db";
import Character from "../models/character";

export default class Login implements Command {
  names = ["login"];

  async handle(msg: Message) {
    const charName = msg.content.split(" ")[1];

    if (!charName) {
      await msg.reply("Please supply a character name to login as!");
      return;
    }

    const charactersQuery = await db.query(
      "SELECT * FROM characters WHERE userId = $1",
      [msg.author.id]
    );
    const character = charactersQuery.rows.filter(
      ({ charname }) => charname == charName
    );

    if (!character.length) {
      await msg.reply(
        "There is no character with this name, if you want to create one, use the create command."
      );
    } else {
      const userQuery = await db.query(
        "UPDATE users SET active = $1 WHERE id = $2",
        [character[0].id, msg.author.id]
      );

      await msg.reply(`Logged in as ${charName}`);
    }
  }
}
