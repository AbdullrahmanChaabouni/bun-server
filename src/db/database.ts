import { Database } from "bun:sqlite";

// export const db = new Database(":memory:");
export const db = new Database("../../mydb.sqlite");

//export const users = db.query("SELECT * FROM users");





