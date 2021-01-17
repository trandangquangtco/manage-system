/* eslint-disable import/extensions */
import express from 'express';
import {
  createCustomer, readCustomer, readOneCustomer, updateCustomer, deleteCustomer,
} from '../../controllers/category/customerController.js';
import { authenticate } from '../../middlewares/middleware.js';
import { validateCustomer } from '../../middlewares/validate.js';

const router = express.Router();

router.post('/customers', authenticate, validateCustomer, createCustomer);
router.get('/customers', authenticate, readCustomer);
router.get('/customers/:id', authenticate, readOneCustomer);
router.put('/customers/:id', authenticate, updateCustomer);
router.delete('/customers', authenticate, deleteCustomer);
export default router;
