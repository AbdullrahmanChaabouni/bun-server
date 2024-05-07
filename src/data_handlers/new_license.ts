import { db } from "../db/database";
import type { TableHandler } from "./handler";

export type TNewLicense = {
  RequestID: number;
  RequestStatus: number;
  CompanyName: string;
  LicenceType: string;
  IsOffice: 1 | 0;
  OfficeName: string;
  OfficeServiceNumber: string;
  RequestDate: string;
  Activities: string;
};

export class NewLicense implements TableHandler<TNewLicense> {
  createTable() {
    db.run(
      `CREATE TABLE IF NOT EXISTS NewLicense (RequestID INTEGER PRIMARY KEY, RequestStatus INTEGER, CompanyName TEXT , LicenceType TEXT, IsOffice INTEGER  , OfficeName TEXT , OfficeServiceNumber TEXT, RequestDate TEXT , Activities TEXT )`
    );
  }

  dropTable() {
    db.run(`DROP TABLE IF EXISTS NewLicense`);
  }

  get() {
    return db.query(`SELECT * FROM NewLicense`).all() as TNewLicense[];
  }
  getById(id: number) {
    return db
      .query(`SELECT * FROM NewLicense WHERE RequestID = ${id}`)
      .get() as TNewLicense;
  }

  insert(data: TNewLicense) {
    db.run(
      `INSERT INTO NewLicense (RequestStatus, CompanyName, LicenceType, IsOffice, OfficeName, OfficeServiceNumber, RequestDate, Activities) VALUES (${data.RequestStatus}, '${data.CompanyName}', '${data.LicenceType}', ${data.IsOffice}, '${data.OfficeName}', '${data.OfficeServiceNumber}', '${data.RequestDate}', '${data.Activities}')`
    );
  }

  update(data: TNewLicense) {
    db.run(
      `UPDATE NewLicense SET RequestStatus = ${data.RequestStatus}, CompanyName = '${data.CompanyName}', LicenceType = '${data.LicenceType}', IsOffice = ${data.IsOffice}, OfficeName = '${data.OfficeName}', OfficeServiceNumber = '${data.OfficeServiceNumber}', RequestDate = '${data.RequestDate}', Activities = '${data.Activities}' WHERE RequestID = ${data.RequestID}`
    );
  }

  deleteById(id: number) {
    db.run(`DELETE FROM NewLicense WHERE RequestID = ${id}`);
  }
}
