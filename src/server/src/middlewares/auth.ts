import AuthenticationService from "../services/authenticationService";
import { getUserByToken } from "../services/cache";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const auth = catchAsync(async (request, _, next) => {
  const token = request.signedCookies.token;

  const decode = await AuthenticationService.verifyToken(token);

  const user = await getUserByToken(decode._id, token);

  if (!user) throw new AppError("Invalid token. Please log in again!", 401);

  request.user = JSON.parse(user);
  request.token = token;

  next();
});
