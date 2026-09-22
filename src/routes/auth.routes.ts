import { Router } from 'express';
import * as authControllerModule from '../controllers/auth.controller';
import * as validateMiddlewareModule from '../middlewares/validate.middleware';
import * as authSchemaModule from '../schemas/auth.schema';

const router = Router();
const { register, login } = authControllerModule;
const { validateBody } = validateMiddlewareModule;
const { authSchema } = authSchemaModule;
router.post('/register', validateBody(authSchema), register);
router.post('/login', validateBody(authSchema), login);

export default router;
