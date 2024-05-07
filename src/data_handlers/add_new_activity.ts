import { db } from "../db/database";
import type { TableHandler } from "./handler";

export type TAddNewActivity = {
  RequestID: number;
  RequestStatus: number;
  CompanyName: string;
  LicenceID: string;
  Activities: string[];
};
export class AddNewActivity implements TableHandler<TAddNewActivity> {
  createTable() {
    db.run(
      `CREATE TABLE IF NOT EXISTS AddNewActivity (
            RequestID INTEGER PRIMARY KEY,
            RequestStatus INTEGER,
            CompanyName TEXT,
            LicenceID TEXT,
            Activities TEXT
        )`
    );
  }
  dropTable() {
    db.run(`DROP TABLE IF EXISTS AddNewActivity`);
  }
  get(): TAddNewActivity[] {
    return db.query(`SELECT * FROM AddNewActivity`).all() as TAddNewActivity[];
  }
  getById(id: number): TAddNewActivity {
    return db
      .query(`SELECT * FROM AddNewActivity WHERE RequestID = ${id}`)
      .get() as TAddNewActivity;
  }

  insert(data: TAddNewActivity) {
    db.run(
      `INSERT INTO AddNewActivity (RequestStatus, CompanyName, LicenceID, Activities) VALUES (?, ?, ?, ?)`,
      [
        data.RequestStatus,
        data.CompanyName,
        data.LicenceID,
        data.Activities.join(","),
      ]
    );
  }

  update(data: TAddNewActivity) {
    db.run(
      `UPDATE AddNewActivity SET RequestStatus = ${data.RequestStatus}, CompanyName = '${data.CompanyName}', LicenceID = '${data.LicenceID}', Activities = '${data.Activities}' WHERE RequestID = ${data.RequestID}`
    );
  }

  deleteById(id: number) {
    db.run(`DELETE FROM AddNewActivity WHERE RequestID = ${id}`);
  }
}
