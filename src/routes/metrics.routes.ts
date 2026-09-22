import { Router } from 'express';
import * as metricsControllerModule from '../controllers/metrics.controller';

const router = Router();
const { getMetrics } = metricsControllerModule;
router.get('/', getMetrics);

export default router;
