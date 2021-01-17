/* eslint-disable import/extensions */
import express from 'express';
import { signin } from '../../controllers/login/login.js';
import { user } from '../../models/manage/userModel.js'

const router = express();

router.post('/login', signin);

export default router;
