import { User } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";

class AuthenticateUserService {
  async authenticate(email, password) {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email or passsword", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default new AuthenticateUserService();
