// server.ts
import express from "express";
import { env } from "./env";
import { client } from "./db";
<<<<<<< HEAD
//import { projectionRouter } from "./services/projection";

=======
import path from 'path';
>>>>>>> refs/remotes/origin/main
const app = express();

app.use(express.json());
app.use(express.urlencoded());

//app.use(projectionRouter);

// Serve static files from 'public' directory
app.use(express.static("public"));
app.use(express.static("protected"));


app.get("/list", async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
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
