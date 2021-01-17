/* eslint-disable import/extensions */
import express from 'express';
import { authenticate } from '../../middlewares/middleware.js';
import {
  createCenter, readCenter, readOneCenter, updateCenter, deleteCenter, readCenterFull,
} from '../../controllers/manage/centerController.js';

const router = express.Router();

router.post('/centers', authenticate, createCenter);
router.get('/centers', authenticate, readCenter);
router.get('/centers-full', authenticate, readCenterFull);
router.get('/centers/:id', authenticate, readOneCenter);
router.put('/centers/:id', authenticate, updateCenter);
router.delete('/centers/:id', authenticate, deleteCenter);

export default router;
