import type { Request, Response, NextFunction } from "express";
import { getTableHandler } from "./upload_file";

export function displayData(req : Request, res:Response){
    const tableNumber = req.params.id;
    if(!["1","2","3","4","5"].includes(tableNumber)){
        res.status(400).send("Invalid table number");
    }

    const tableHandler = getTableHandler(tableNumber);
    res.json(tableHandler.get());
}