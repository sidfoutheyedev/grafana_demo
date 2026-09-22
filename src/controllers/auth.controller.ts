import * as handlersModule from '../../packages/handlers/index';
import * as constantsModule from '../../packages/constants/index';
import * as authUtilModule from '../utils/auth';
import bcrypt from 'bcryptjs';
import * as userModelModule from '../models/user.model';
import type { Request, Response } from 'express';

const { successHandler, errorHandler } = handlersModule;
const { CONSTANT } = constantsModule;
const { signToken } = authUtilModule;
const { findUserByEmail, createUser } = userModelModule;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existing = await findUserByEmail(email);
  if (existing) {
    return errorHandler({ status: 409, message: CONSTANT.PAYLOAD.RECORD_ALREADY_EXIST }, req, res);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user: any = await createUser({ email, password: hashed });
  const token = signToken({ sub: String(user.id ?? user._id), email: user.email });
  successHandler({
    status: 201,
    message: CONSTANT.PAYLOAD.RECORD_CREATED_SUCCESSFULLY,
    data: { token },
  }, req, res);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await findUserByEmail(email);
  if (!user) {
    return errorHandler({ status: 401, message: CONSTANT.STATUS.INVALID_CREDS }, req, res);
  }
  const valid = await bcrypt.compare(password, String(user.password));
  if (!valid) {
    return errorHandler({ status: 401, message: CONSTANT.STATUS.INVALID_CREDS }, req, res);
  }
  const token = signToken({ sub: String(user.id ?? user._id), email: user.email });
  successHandler({
    status: 200,
    message: CONSTANT.STATUS.SUCCESSFULL,
    data: { token },
  }, req, res);
};
