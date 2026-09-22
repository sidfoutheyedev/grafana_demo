import * as handlersModule from '../../packages/handlers/index';
import * as authUtilModule from '../utils/auth';
import type { Request, Response, NextFunction } from 'express';

const { errorHandler } = handlersModule;
const { verifyToken } = authUtilModule;

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return errorHandler({ status: 401, message: "Missing or invalid Authorization header" }, req, res);
  }
  try {
    (req as any).user = verifyToken(token);
    next();
  } catch {
    return errorHandler({ status: 401, message: "Invalid or expired token" }, req, res);
  }
};
