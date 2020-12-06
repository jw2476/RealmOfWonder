import client from "../db";

export default class Guild {
  id: string;
  prefix: string;

  constructor(id: string, prefix: string) {
    this.id = id;
    this.prefix = prefix;
  }

  static async createTable() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS guilds (
            id VARCHAR ( 64 ) UNIQUE NOT NULL,
            prefix VARCHAR ( 64 ) NOT NULL
        );
        `);
  }

  async insert() {
    await client.query("INSERT INTO guilds(id, prefix) VALUES ($1, $2)", [
      this.id,
      this.prefix,
    ]);
  }
}
