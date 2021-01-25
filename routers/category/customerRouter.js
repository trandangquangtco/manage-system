import express from 'express';
import {
  createCustomer, readCustomer, readOneCustomer, updateCustomer, deleteCustomer,
} from '../../controllers/category/customerController';
import { authenticate } from '../../middlewares/middleware';

const router = express.Router();

router.post('/customers', authenticate, createCustomer);
router.get('/customers/', authenticate, readCustomer);
router.get('/customers/:id', authenticate, readOneCustomer);
router.put('/customers/:id', authenticate, updateCustomer);
router.delete('/customers', authenticate, deleteCustomer);
export default router;
