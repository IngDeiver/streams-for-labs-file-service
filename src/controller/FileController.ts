/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IFile } from '../interfaces';
import { File } from '../models';
import { HttpException } from '../exceptions';
import { FileService } from '../services';

/**
 *
 * The File controller
 * @category Controllers
 * @class FileController
 */
class FileController {
  /**
   *
   * List all Files
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of Files
   * @memberof FileController
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const Files: Array<IFile> = await FileService.list();
      res.json(Files);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * create a new File
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A File creted
   * @memberof FileController
   */
  public static async create(req: any, res: Response, next: NextFunction) {
    try {
      let file = req.file
      //console.log("Body:" + req.body);
      
      console.log("File received in storage service: ", req.file);
      console.log("User received in storage service:" , req.body.user);
      

      const fileInstance:IFile = new File({ name: file.fieldname, path: file.path, weight: file.size,
        upload_at: new Date(), author: req.user, shared_users:[]});

      const fileSaved: IFile = await FileService.create(fileInstance);
      res.json(fileSaved);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * Get File by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of Files
   * @memberof FileController
   */
  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const File: IFile | null = await FileService.getById(id);
      if (!File) throw new HttpException(404, 'File not found');
      res.json(File);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * Remove File by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of FileS
   * @memberof FileController
   */
  public static async removeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const File: IFile | null = await FileService
        .removeById(id);
      if (!File) throw new HttpException(404, 'File not found');
      res.json(File);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * Update File by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of FileS
   * @memberof FileController
   */
  public static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { Filename, email, password } = req.body;
      const FileUpdated: IFile | null = await FileService
        .updateById(id, { Filename, email, password});
      if (!FileUpdated) throw new HttpException(404, 'File not found');
      res.json(FileUpdated);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

}
export default FileController;
