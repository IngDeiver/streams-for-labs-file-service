import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { FileControler } from '../controller';
import { isDefinedParamMiddleware } from '../middlewares';
import upload from '../middlewares/multer'

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
  public pathAuthorParam = '/:author'

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

    // list Files
    this.router.get(`${this.pathAuthorParam}`,
    (req: Request, res: Response, next: NextFunction) => FileControler
      .list(req, res, next));

    // Save File
    this.router.post(`${this.pathAuthorParam}`,
      upload.single('file'),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .create(req, res, next),
    );

    // Get File
    this.router.get(
      `${this.pathIdParam}${this.pathAuthorParam}`,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .download(req, res, next),
    );


    // // Update File
    // this.router.put(
    //   this.pathIdParam,
    //   isDefinedParamMiddleware(),
    //   validationMiddleware(FileDTO, true),
    //   (req: Request, res: Response, next: NextFunction) => FileControler
    //     .updateById(req, res, next),
    // );

    // Remove File
    this.router.delete(
      `${this.pathIdParam}${this.pathAuthorParam}`,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => FileControler
        .removeById(req, res, next),
    );
  }
}
export default new FileRouter().router;
