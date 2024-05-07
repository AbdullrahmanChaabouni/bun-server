import express from "express";
import { getTableHandler, uploadFile } from "./src/handelers/upload_file";
import { displayData } from "./src/handelers/display_data";

const app = express();
//

app.post("/uploadFile", uploadFile);
app.get("/displayData/:id", displayData);
app.listen(3000, () => {
  createTables();

  console.log("Server is running on port 3001");
});

function createTables() {
  for (let i = 1; i <= 5; i++) {
    getTableHandler(i.toString()).createTable();
  }
}
