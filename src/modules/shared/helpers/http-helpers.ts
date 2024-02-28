import { AppError } from "../errors/app-error";
import { Http } from "../protocols/http";

export const badRequest = (
  error: AppError | Error
): Http.Response<AppError | Error> => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: AppError | Error): Http.Response<AppError | Error> => ({
  statusCode: 500,
  body: new AppError({
    code: 500,
    message: "Sever Error, try again later",
    name: "ServerError",
  }),
});

export const ok = <T = any>(body: T): Http.Response<T> => ({
  statusCode: 200,
  body,
});
