import { Knex } from "knex";
import { HttpError } from "../http-error";
import { comparePassword, hashPassword } from "../hash";

export class UserService {
  constructor(private knex: Knex) {}

  async login(input: { email: string; password: string }): Promise<{ id: number; username: string }> {
    try {
      let user = await this.knex("users").select("id", "name", "hash_password").where({ email: input.email }).first();

      if (!user || (await comparePassword({ password: input.password, password_hash: user.hash_password }))) {
        throw new HttpError(401, "wrong username or passsword");
      }
      return { id: user.id, username: user.name };
    } catch (error) {
      let message = String(error);

      console.log("sql error:", message);
      throw error;
    }
  }

  async register(input: { username: string; email: string; password: string }): Promise<{ id: number }> {
    try {
      let [{ id }] = await this.knex("users")
        .insert({
          name: input.username,
          email: input.email,
          hash_password: await hashPassword(input.password),
        })
        .returning("id");
      return { id };
    } catch (error) {
      let message = String(error);

      if (message.match(/username_unique/i)) throw new HttpError(409, "this username is already taken by another user");

      if (message.match(/email_unique/i)) throw new HttpError(409, "this email has already registered");

      console.log("sql error:", message);
      throw error;
    }
  }
}
