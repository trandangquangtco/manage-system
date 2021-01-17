/* eslint-disable import/extensions */
import express from 'express';
import {
  techStackInStaff, certificateInStaff, experienceInStaff, projectInStaff,
} from '../../controllers/report/staffReport.js';
import { authenticate } from '../../middlewares/middleware.js';

const router = express.Router();

router.get('/techStacks', authenticate, techStackInStaff);
router.get('/certificates', authenticate, certificateInStaff);
router.get('/experience', authenticate, experienceInStaff);
router.get('/projects', authenticate, projectInStaff);

export default router;
