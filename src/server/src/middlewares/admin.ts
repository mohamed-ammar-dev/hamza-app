import AppError from "../utils/appError";

export const restrictTo = (role) => {
  return (req, _, next) => {
    if (role != req.user.role)
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );

    next();
  };
};
