
import { db } from "../db/database";
import type { TableHandler } from "./handler";



export type TStampLicenseLetter = {
  RequestID: number;
  RequestStatus: number;
  CompanyName: string;
  LicenceID: string;
  RequestDate: string;
};




export class StampLicenseLetter  implements TableHandler<TStampLicenseLetter> {
  createTable(): void {
    db.run(
      `CREATE TABLE IF NOT EXISTS StampLicenseLetter (
            RequestID INTEGER PRIMARY KEY,
            RequestStatus INTEGER,
            CompanyName TEXT,
            LicenceID TEXT,
            RequestDate TEXT
        )`
    );
  }
  dropTable(): void {
    db.run(`DROP TABLE IF EXISTS StampLicenseLetter`);
  }

  get() {
    return db
      .query(`SELECT * FROM StampLicenseLetter`)
      .all() as TStampLicenseLetter[];
  }
  getById(id: number) {
    return db
      .query(`SELECT * FROM StampLicenseLetter WHERE RequestID = ${id}`)
      .get() as TStampLicenseLetter;
  }
  insert(data: TStampLicenseLetter) {
    db.run(
      `INSERT INTO StampLicenseLetter (RequestStatus, CompanyName, LicenceID, RequestDate) VALUES (?, ?, ?, ?)`,
      [data.RequestStatus, data.CompanyName, data.LicenceID, data.RequestDate]
    );
  }

  update(data: TStampLicenseLetter) {
    db.run(
      `UPDATE StampLicenseLetter SET RequestStatus = ${data.RequestStatus}, CompanyName = '${data.CompanyName}', LicenceID = '${data.LicenceID}', RequestDate = '${data.RequestDate}' WHERE RequestID = ${data.RequestID}`
    );
  }

  deleteById(id: number) {
    db.run(`DELETE FROM StampLicenseLetter WHERE RequestID = ${id}`);
  }
}