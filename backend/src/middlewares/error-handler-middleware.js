import { DEBUG_MODE } from "../config/index.js";
import ErrorHandlerService from "../services/error-handler-service.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let status = 500;
  let data = {
    message: "Internal Server Error !",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ErrorHandlerService) {
    status = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(status).json(data);
};

export default errorHandlerMiddleware;
