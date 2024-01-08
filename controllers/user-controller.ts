import { Request, Response, NextFunction, Router } from "express";
import { UserService } from "../services/user-service";
import { HttpError } from "../http-error";
import "../session";

export class UserController {
  public router = Router();

  wrapMethod(method: (req: Request) => object | Promise<object>) {
    method = method.bind(this);
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let json = await method(req);
        res.json(json);
      } catch (error) {
        next(error);
      }
    };
  }

  constructor(private userService: UserService) {
    this.router.post("/user/login", this.wrapMethod(this.login));
    this.router.post("/user/register", this.wrapMethod(this.register));
    this.router.get("/user/userinfo.js", this.userinfo);
  }

  async login(req: Request) {
    let { email, password } = req.body;

    if (!email) {
      throw new HttpError(400, "email is required");
    }
    if (!password) {
      throw new HttpError(400, "password is required");
    }

    let json = await this.userService.login({ email: email, password: password });

    req.session.user = {
      id: json.id,
      username: json.username,
    };
    req.session.save();

    return {};
  }

  async register(req: Request) {
    let { username, email, password } = req.body;

    if (!username) {
      throw new HttpError(400, "username is required");
    }
    if (!email) {
      throw new HttpError(400, "email is required");
    }
    if (!password) {
      throw new HttpError(400, "password is required");
    }
    if (username.length < 4 || username.length > 16) {
      throw new HttpError(400, "username length must be between 4 and 16");
    }
    if (password.length < 4 || password.length > 16) {
      throw new HttpError(400, "password length must be between 4 and 16");
    }
    if (email.length > 255) {
      throw new HttpError(400, "email length must be less than 256");
    }

    let json = await this.userService.register({ username, email, password });

    req.session.user = {
      id: json.id,
      username,
    };
    req.session.save();

    return json;
  }

  async userinfo(req: Request, res: Response) {
    res.write("let user = ");

    if (!req.session.user) {
      res.end("undefined;");
      return;
    }

    let { username } = req.session.user;

    res.end(`${JSON.stringify({ username })};`);
  }
}
