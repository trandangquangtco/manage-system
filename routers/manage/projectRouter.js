/* eslint-disable import/extensions */
import express from 'express';
import {
  createProject, readOneProject, readProject, updateProject, deleteProject, readProjectFull,
} from '../../controllers/manage/projectController.js';
import { authenticate } from '../../middlewares/middleware.js';
import { validateProject } from '../../middlewares/validate';

const router = express.Router();

router.post('/projects', authenticate, validateProject, createProject);
router.get('/projects', authenticate, readProject);
router.get('/projects-full', authenticate, readProjectFull);
router.get('/projects/:id', authenticate, readOneProject);
router.put('/projects/:id', authenticate, updateProject);
router.delete('/projects/:id', authenticate, deleteProject);

export default router;
