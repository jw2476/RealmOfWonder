import { Client, Guild as DiscordGuild, Message } from "discord.js";
import env from "./env";
import models from "./models";
import Guild from "./models/guild";
import db from "./db";
import handle, { initCommands } from "./cmd";

const client = new Client();
models().then();

client.on("ready", () => {
  console.log("Ready!");
  initCommands();
});

client.on("guildCreate", async (g: DiscordGuild) => {
  const guild = new Guild(g.id, "w!");
  await guild.insert();
});

client.on("guildDelete", async (g: DiscordGuild) => {
  await db.query("DELETE FROM guilds WHERE id = $1", [g.id]);
});

client.on("message", async (msg: Message) => {
  await handle(msg);
});

client.login(env.TOKEN).then();
