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
    if (!min || !max) {
      throw new Error("Bad request");
    }

    let result = await knex("history").select("date", "holiday", "temperature", "rainfall", "demand").andWhere("id", ">=", min).andWhere("id", "<=", max);

    res.json({ result: result });
  } catch (error) {
    res.json({ error: error });
  }
});

// app.get("/projection", async (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, 'public', 'projection.html'));
//   } catch (err) {
//     console.log(err);
//     res.json({ err: "internal server error" });
//   }
// });

app.use((req, res) => {
  res.status(404).json({ err: "Not Found" });
});

app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});
