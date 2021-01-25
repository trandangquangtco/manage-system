/* eslint-disable import/extensions */
import express from 'express';
import {
  createStatus, readOneStatus, readStatus, updateStatus, deleteStatus,
} from '../../controllers/category/statusController.js';
import { authenticate } from '../../middlewares/middleware.js';

const router = express.Router();

router.post('/status', authenticate, createStatus);
router.get('/status', authenticate, readStatus);
router.get('/status/:id', authenticate, readOneStatus);
router.put('/status/:id', authenticate, updateStatus);
router.delete('/status/:id', authenticate, deleteStatus);

export default router;
