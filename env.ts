import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "development",
  PORT: 8100,
  DB_NAME: "lc",
  DB_USER: "lc",
  DB_PASSWORD: "123",
  SESSION_SECRET: "123",
};

populateEnv(env, { mode: "halt" });
