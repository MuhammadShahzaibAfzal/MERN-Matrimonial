import ErrorHandlerService from "../services/error-handler-service.js";

const adminMiddleware = (req, res, next) => {
  if (req.userData.role === "Admin") {
    next();
  } else {
    next(ErrorHandlerService.forbidden("Not Allowed"));
  }
};

export default adminMiddleware;
