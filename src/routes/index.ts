import { Router } from 'express';
import FileRouter from './file.route';
import PhotoRouter from './photo.route';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/file`, FileRouter);
router.use(`${prefix}/photo`, PhotoRouter);

export default router;
