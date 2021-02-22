import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { FileControler } from '../controller';
import { isDefinedParamMiddleware, validationMiddleware } from '../middlewares';
import { FileDTO } from '../dtos';
import upload from '../middlewares/multer'
import getAuthUserMiddleware from '../middlewares/getAuthUser'

/**
 *
 * Managament the routes of File
 * @category Routes
 * @class FileRouter
 * @implements {IRoute}
 */
class FileRouter implements IRoute {
  public router = Router();

  public pathIdParam = '/:id';

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

    // get File by Id
    this.router.get(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .getById(req, res, next),
    );

    // list Files
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => FileControler
      .list(req, res, next));

    // Save File
    this.router.post('/',
      upload.single('file'),
      (req, res, next) => getAuthUserMiddleware(req, next),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .create(req, res, next),
    );

    // Update File
    this.router.put(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      validationMiddleware(FileDTO, true),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .updateById(req, res, next),
    );

    // Remove File
    this.router.delete(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .removeById(req, res, next),
    );
  }
}
export default new FileRouter().router;
