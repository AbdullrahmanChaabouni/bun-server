import { db } from "../db/database";
import type { TableHandler } from "./handler";

export type TInspectionRequest = {
  RequestID: number;
  RequestStatus: number;
  CompanyName: string;
  InspectionDate: string;
  InspectionTime: string;
  InspectionType: string;
};

export class InspectionRequest implements TableHandler<TInspectionRequest> {
  createTable() {
    db.run(
      `CREATE TABLE IF NOT EXISTS InspectionRequest (
            RequestID INTEGER PRIMARY KEY,
            RequestStatus INTEGER,
            CompanyName TEXT,
            InspectionDate TEXT,
            InspectionTime TEXT,
            InspectionType TEXT
        )`
    );
  }

  dropTable() {
    db.run(`DROP TABLE IF EXISTS InspectionRequest`);
  }
  get() {
    return db
      .query(`SELECT * FROM InspectionRequest`)
      .all() as TInspectionRequest[];
  }
  getById(id: number) {
    return db
      .query(`SELECT * FROM InspectionRequest WHERE RequestID = ${id}`)
      .get() as TInspectionRequest;
  }

  insert(data: TInspectionRequest) {
    db.run(
      `INSERT INTO InspectionRequest (RequestStatus, CompanyName, InspectionDate, InspectionTime, InspectionType) VALUES (?, ?, ?, ?, ?)`,
      [
        data.RequestStatus,
        data.CompanyName,
        data.InspectionDate,
        data.InspectionTime,
        data.InspectionType,
      ]
    );
  }

  update(data: TInspectionRequest) {
    db.run(
      `UPDATE InspectionRequest SET RequestStatus = ${data.RequestStatus}, CompanyName = '${data.CompanyName}', InspectionDate = '${data.InspectionDate}', InspectionTime = '${data.InspectionTime}', InspectionType = '${data.InspectionType}' WHERE RequestID = ${data.RequestID}`
    );
  }

  deleteById(id: number) {
    db.run(`DELETE FROM InspectionRequest WHERE RequestID = ${id}`);
  }
}
