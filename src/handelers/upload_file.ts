import type { Request, Response, NextFunction } from "express";
import csv from "csv-parser";
import { NewLicense, type TNewLicense } from "../data_handlers/new_license";
import {
  AccountRequest,
  type TAccountRequest,
} from "../data_handlers/account_request";
import {
  InspectionRequest,
  type TInspectionRequest,
} from "../data_handlers/inspection_request";
import {
  AddNewActivity,
  type TAddNewActivity,
} from "../data_handlers/add_new_activity";
import {
  StampLicenseLetter,
  type TStampLicenseLetter,
} from "../data_handlers/stamp_license_letter";
import type { TableHandler } from "../data_handlers/handler";

export function uploadFile(req: Request, res: Response) {
  req.on("data", (chunk: Buffer) => {
    const parser = csv({
      headers: ["RequestID", "RequestType", "RequestStatus", "RequestData"],
    });
    parser.write(chunk);
    parser.on("data", (data) => {
      try {
        const jsonData = JSON.parse(data["RequestData"]);
        //delete data["RequestData"];

        const cleanData = {
          ...data,
          ...jsonData,
        };

        const RequestType = cleanData["RequestType"];
        delete cleanData["RequestType"];

        const tableHandler = getTableHandler(RequestType);

        tableHandler.insert(cleanData);
      } catch (error: any) {
        console.log(error?.message , data);
      }
    });
    parser.end();

    req.on("end", () => {
      res.send("File uploaded successfully");
    });

    req.on("error", (error) => {
      res.status(500).send("Error uploading file");
    });
  });
}

function saveToDB(data: unknown, RequestType: string) {}

export function getTableHandler(RequestType: string): TableHandler<unknown> {
  switch (RequestType) {
    case "1":
      return new NewLicense();
    case "2":
      return new AccountRequest();
    case "3":
      return new InspectionRequest();
    case "4":
      return new AddNewActivity();
    case "5":
      return new StampLicenseLetter();
  }

  throw new Error("Invalid Request Type");
}
