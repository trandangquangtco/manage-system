/* eslint-disable import/extensions */
import express from 'express';
import {
  createUser, readUser, readOneUser, updateUser, deleteUser,
} from '../../controllers/manage/userController.js';
import { authenticate } from '../../middlewares/middleware.js';

const router = express.Router();

router.post('/users', authenticate, createUser);
router.get('/users', authenticate, readUser);
router.get('/users/:id', authenticate, readOneUser);
router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);

export default router;
