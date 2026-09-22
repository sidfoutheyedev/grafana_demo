import { Router } from 'express';
import * as healthControllerModule from '../controllers/health.controller';

const router = Router();
const { healthCheck } = healthControllerModule;
router.get('/', healthCheck);

export default router;
