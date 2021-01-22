/* eslint-disable import/extensions */
import express from 'express';
import {
  createStaff, readOneStaff, readStaff, updateStaff, deleteStaff, readStaffFull,
} from '../../controllers/manage/staffController.js';
import { authenticate } from '../../middlewares/middleware.js';
import { validateStaff } from '../../middlewares/validate';

const router = express.Router();

router.post('/staffs', authenticate, validateStaff, createStaff);
router.post('/staffs', authenticate, readStaff);
router.get('/staffs-full', authenticate, readStaffFull);
router.get('/staffs/:id', authenticate, readOneStaff);
router.put('/staffs/:id', authenticate, updateStaff);
router.delete('/staffs/:id', authenticate, deleteStaff);

export default router;
