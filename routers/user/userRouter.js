/* eslint-disable import/extensions */
import express from 'express';
import { signin, refreshToken } from '../../controllers/login/login.js';

const router = express();

router.post('/login', signin);
router.post('/refreshToken', refreshToken);

export default router;
