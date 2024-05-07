import { db } from "../db/database";
import type { TableHandler } from "./handler";

export type TAccountRequest = {
  RequestID: number;
  RequestStatus: number;
  CompanyName: string;
  RequesterName: string;
  ApplicantName: string;
  UserName: string;
  ContactEmail: string;
  Permissions: string[];
};

export class AccountRequest implements TableHandler<TAccountRequest> {
  createTable() {
    db.run(
      `CREATE TABLE IF NOT EXISTS AccountRequest (
            RequestID INTEGER PRIMARY KEY,
            RequestStatus INTEGER,
            CompanyName TEXT,
            RequesterName TEXT,
            ApplicantName TEXT,
            UserName TEXT,
            ContactEmail TEXT,
            Permissions TEXT
        )`
    );
  }
  dropTable() {
    db.run(`DROP TABLE IF EXISTS AccountRequest`);
  }
  get(): TAccountRequest[] {
    return db.query(`SELECT * FROM AccountRequest`).all() as TAccountRequest[];
  }
  getById(id: number): TAccountRequest {
    return db
      .query(`SELECT * FROM AccountRequest WHERE RequestID = ${id}`)
      .get() as TAccountRequest;
  }

  insert(data: TAccountRequest) {
    db.run(
      `INSERT INTO AccountRequest (RequestStatus, CompanyName, RequesterName, ApplicantName, UserName, ContactEmail, Permissions) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.RequestStatus,
        data.CompanyName,
        data.RequesterName,
        data.ApplicantName,
        data.UserName,
        data.ContactEmail,
        data.Permissions.join(",")
      ]
    );
  }

  update(data: TAccountRequest) {
    db.run(
      `UPDATE AccountRequest SET RequestStatus = ${data.RequestStatus}, CompanyName = '${data.CompanyName}', RequesterName = '${data.RequesterName}', ApplicantName = '${data.ApplicantName}', UserName = '${data.UserName}', ContactEmail = '${data.ContactEmail}', Permissions = '${data.Permissions}' WHERE RequestID = ${data.RequestID}`
    );
  }

  deleteById(id: number) {
    db.run(`DELETE FROM AccountRequest WHERE RequestID = ${id}`);
  }
}
