/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import projectTypeRouter from './routers/category/projectTypeRouter';
import customerRouter from './routers/category/customerRouter';
import statusRouter from './routers/category/statusRouter';
import techStackRouter from './routers/category/techStackRouter';
import centerRouter from './routers/manage/centerRouter';
import projectRouter from './routers/manage/projectRouter';
import staffRouter from './routers/manage/staffRouter';
import userRouter from './routers/manage/userRouter';
import login from './routers/user/userRouter';
import projectReportRouter from './routers/report/projectReportRouter';
import staffReportRouter from './routers/report/staffReportRouter';

const app = express();
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
// dotenv.config();
mongoose.connect('mongodb://localhost:27017/vmoprj', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', customerRouter);
app.use('/', statusRouter);
app.use('/', techStackRouter);
app.use('/', centerRouter);
app.use('/', projectRouter);
app.use('/', staffRouter);
app.use('/', userRouter);
app.use('/', login);
app.use('/', projectTypeRouter);
app.use('/report/projects', projectReportRouter);
app.use('/report/staffs', staffReportRouter);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not found',
    messageCode: 'NOTFOUND',
  });
});
console.log(process.env.PORT);
app.listen(3000, () => { console.log('connect to port 3000'); });

export default app;
