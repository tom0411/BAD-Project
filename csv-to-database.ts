import * as fs from "fs";
import { knex } from "./db";

dataBase();

async function dataBase() {
  const words = fs.readFileSync("./historical_data.csv", "utf-8").split("\r\n");

  let array = [];

  for (let i = 1; i < words.length; i++) {
    let [year, month, day, date, weekday, holiday, temperature, rainfall, demand] = words[i].split(",");
    array.push({ date: new Date(Date.parse(year + "/" + month + "/" + day) + 8 * 60 * 60 * 1000), holiday: holiday == "TRUE", temperature, rainfall, demand });
  }

  let result = await knex("badproject").insert(array).into("history");
  console.log("Seeded");
  process.exit(0);
}
