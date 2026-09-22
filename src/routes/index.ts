import { Router } from 'express';
import healthRoutesModule from './health.routes';
import authRoutesModule from './auth.routes';
import itemRoutesModule from './item.routes';
import metricsRoutesModule from './metrics.routes';

const router = Router();
const healthRoutes = healthRoutesModule;
const authRoutes = authRoutesModule;
const itemRoutes = itemRoutesModule;
const metricsRoutes = metricsRoutesModule;
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/metrics', metricsRoutes);

export default router;
