/* eslint-disable camelcase */
import { Request, Response } from "express";
import UserService from "../services/UserService";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

class UserController {
  async findAll(request: Request, response: Response) {
    const users = await UserService.findAll();

    return users.length > 0
      ? response.status(200).json(users)
      : response.status(204).send();
  }

  async findOne(request: Request, response: Response) {
    const user = await UserService.findOne(request.params.id);

    return user ? response.status(200).json(user) : response.status(204).send();
  }

  async findByToken(request: Request, response: Response) {
    const { token } = request.params;

    try {
      const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

      const user = await UserService.findOne(user_id);

      return user
        ? response.status(200).json(user)
        : response.status(204).send();
    } catch {
      throw new AppError("JWT invalid token", 401);
    }
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const user = await UserService.create(name, email, password);

    return response.status(201).json(user);
  }

  async update(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const { id } = request.params;
    await UserService.update(id, name, email, password);

    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    await UserService.destroy(id);

    return response.status(204).send();
  }
}

export default new UserController();
