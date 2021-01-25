/* eslint-disable import/extensions */
import express from 'express';
import {
  createProjectType, readOneProjectType, readProjectType, updateProjectType, deleteProjectType,
} from '../../controllers/category/projectTypeController';
import { authenticate } from '../../middlewares/middleware';

const router = express.Router();

router.post('/projectTypes', authenticate, createProjectType);
router.get('/projectTypes', authenticate, readProjectType);
router.get('/projectTypes/:id', authenticate, readOneProjectType);
router.put('/projectTypes/:id', authenticate, updateProjectType);
router.delete('/projectTypes/:id', authenticate, deleteProjectType);

export default router;
