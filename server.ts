// server.ts
import express from "express";
import { env } from "./env";
import { client } from "./db";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
// Serve static files from 'public' directory
app.use(express.static("public"));
app.use(express.static("protected"));


app.get("/projection", async (req, res) => {
  try {

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
