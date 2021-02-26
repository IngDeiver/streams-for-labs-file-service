import {
    NextFunction, Request, Response, Router,
  } from 'express';
  import { IRoute } from '../interfaces';
  import { PhotoControler } from '../controller';
  import { isDefinedParamMiddleware, validationMiddleware } from '../middlewares';
  import getAuthUserMiddleware from '../middlewares/getAuthUser'
  
  /**
   *
   * Managament the routes of Photo
   * @category Routes
   * @class PhotoRouter
   * @implements {IRoute}
   */
  class PhotoRouter implements IRoute {
    public router = Router();
  
    public pathIdParam = '/:id';
    public pathAuthorParam = '/:author'
  
    constructor() {
      this.createRoutes();
    }
  
    createRoutes(): void {
  
      // list Photos
      this.router.get(this.pathAuthorParam, 
      (req, res, next) => getAuthUserMiddleware(req, next),
      (req: Request, res: Response, next: NextFunction) => PhotoControler
        .list(req, res, next));
  
   
      // Get Photo
      this.router.get(
        `${this.pathIdParam}${this.pathAuthorParam}`,
        isDefinedParamMiddleware(),
        (req: Request, res: Response, next: NextFunction) => PhotoControler
          .download(req, res, next),
      );

    }
  }
  export default new PhotoRouter().router;
  