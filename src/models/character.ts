import client from "../db";

export default class Character {
  id: string;
  charName: string;

  constructor(id: string, charName: string) {
    this.id = id;
    this.charName = charName;
  }

  static async createTable() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS characters (
            id serial PRIMARY KEY,
            userId VARCHAR ( 64 ) NOT NULL,
            charName VARCHAR ( 128 ) NOT NULL
         );
        `);
  }

  async insert() {
    await client.query(
      "INSERT INTO characters(userId, charName) VALUES ($1, $2)",
      [this.id, this.charName]
    );
  }
}
