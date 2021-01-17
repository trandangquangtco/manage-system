/* eslint-disable import/extensions */
import express from 'express';
import { techStackInProject, TypeInProject, statusInProject } from '../../controllers/report/projectReport.js';
import { authenticate } from '../../middlewares/middleware.js';

const router = express();

router.get('/status', authenticate, statusInProject);
router.get('/projectTypes', authenticate, TypeInProject);
router.get('/techStacks', authenticate, techStackInProject);

export default router;
