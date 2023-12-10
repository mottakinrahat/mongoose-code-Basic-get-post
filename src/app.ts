/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  request,
} from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

//application Routes
app.use('/api/v1/', router);
const test = (req: Request, res: Response) => {

// const a=10;
// res.send(a)
};
app.get('/', test);
app.use(globalErrorHandler);
app.use(notFound);

//not found

export default app;
