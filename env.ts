import dotenv from "dotenv";
import populateEnv from "populate-env";

dotenv.config();

export let env = {
  NODE_ENV: "development",
  PORT: 8100,
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  SESSION_SECRET: "",
};

populateEnv(env, { mode: "halt" });

// console.log({
//   DB_USER: process.env.DB_USER,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_NAME: process.env.DB_NAME,
//   SESSION_SECRET: process.env.SESSION_SECRET,
//   PORT: process.env.PORT,
  
// })
// console.log(env)