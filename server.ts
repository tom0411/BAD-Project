// server.ts
import express from "express";
import { env } from "./env";
// import { client } from "./db";
import { projectionRouter } from "./services/projection";
import path from "path";
import { knex } from "./db";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(projectionRouter);

// Serve static files from 'public' directory
app.use(express.static("public"));
app.use(express.static("protected"));

app.get("/list", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "list.html"));
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});

app.get("/history", async (req, res) => {
  try {
    let query = req.query;
    let min = query.min;
    let max = query.max;
    let holiday = query.holiday;

    if (!min || !max) {
      throw new Error("Bad request");
    }

    let results = await knex("history").select("date", "holiday", "temperature", "rainfall", "demand").andWhere("id", ">=", min);

    let array = [];

    for (let result of results) {
      if (holiday) {
        if (result.holiday != (holiday == "yes")) {
          continue;
        }
      }
      array.push(result);

      if (array.length > +max - +min) {
        break;
      }
    }

    res.json({ result: array });
  } catch (error) {
    res.json({ error: error });
  }
});

app.get("/projection", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'projection.html'));
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ err: "Not Found" });
});

app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});
