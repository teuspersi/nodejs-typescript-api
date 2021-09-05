import "express-async-errors";

import express, { json } from "express";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);

export { app };
