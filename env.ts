import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "development",
  PORT: 8100,
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  SESSION_SECRET: "",
};

populateEnv(env, { mode: "halt" });
console.log(env)