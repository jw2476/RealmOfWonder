import client from "../db";

export default class User {
  id: string;
  active?: number;

  constructor(id: string, active?: number) {
    this.id = id;
    if (active) {
      this.active = active;
    }
  }

  static async createTable() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR ( 64 ) NOT NULL,
            active INT,
            FOREIGN KEY ( active ) REFERENCES characters ( id )
        );
        `);
  }

  async insert() {
    if (this.active) {
      await client.query("INSERT INTO users(id, active) VALUES ($1, $2)", [
        this.id,
        this.active,
      ]);
    } else {
      await client.query("INSERT INTO users(id) VALUES ($1)", [this.id]);
    }
  }
}
