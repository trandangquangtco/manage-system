/* eslint-disable import/extensions */
import express from 'express';
import {
  createTechStack, readTechStack, readOneTechStack, updateTechStack, deleteTechStack,
} from '../../controllers/category/techStackController.js';
import { authenticate } from '../../middlewares/middleware.js';
import { validateTechStack } from '../../middlewares/validate';

const router = express.Router();

router.post('/techStacks', authenticate, validateTechStack, createTechStack);
router.get('/techStacks', authenticate, readTechStack);
router.get('/techStacks/:id', authenticate, readOneTechStack);
router.put('/techStacks/:id', authenticate, updateTechStack);
router.delete('/techStacks/:id', authenticate, deleteTechStack);

export default router;
