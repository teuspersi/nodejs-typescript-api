import { Request, Response } from "express";
import AuthenticateUserService from "../services/authenticate-user.service";

class AuthenticateUserController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const { user, token } = await AuthenticateUserService.authenticate(
      email,
      password
    );

    return response.json({ user, token });
  }
}

export default new AuthenticateUserController();
