import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    // eslint-disable-next-line camelcase
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    response.locals.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("JWT invalid token", 401);
  }
}
