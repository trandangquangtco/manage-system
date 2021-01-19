/* eslint-disable import/extensions */
import express from 'express';
import {
  techStackInStaff, certificateInStaff, experienceInStaff, projectInStaff,
} from '../../controllers/report/staffReport.js';
import { authenticate } from '../../middlewares/middleware.js';
// import { findStaffFull } from '../../services/manage/staffService';
import { staff } from '../../models/manage/staffModel';

const router = express.Router();

router.get('/techStacks', authenticate, techStackInStaff);
router.get('/certificates', authenticate, certificateInStaff);
router.get('/experience', authenticate, experienceInStaff);
router.get('/projects', authenticate, projectInStaff);

router.post('/search', async (req, res) => {
  try {
    const body = req.body;
    if (body.techStack) {
      const find = await staff.find({
        'techStack.techStack': body.techStack,
      }).populate({ path: 'techStack', populate: 'techStack' });
      res.json(find);
    } else if (body.framework) {
      const find = await staff.find({
        'techStack.framework': body.framework,
      });
      res.json(find);
    } else {
      const find = await staff.find(req.body);
      res.json(find);
    }
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
