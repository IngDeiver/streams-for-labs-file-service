/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IFile,IPhoto, IVideo} from '../interfaces';
import { File, Photo, Video } from '../models';
import { HttpException } from '../exceptions';
import { FileService, PhotoService, VideoService } from '../services';
import fs from 'fs'
import path from 'path'


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
      const author = req.params.author
      const Files: Array<IFile> = await FileService.getFiles(author);
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
      
      console.log("File received in storage service: ",file);
      console.log("File Storage in: ", file.path);
      
      //const author = req.user._id
      const author = req.params.author
      const path = file.path
      const weight = file.size
      const upload_at = new Date()
      const name = file.originalname

      if(file.mimetype.includes("image")){ // Save image
        const photoInstance:IPhoto = new Photo({name, path, weight, upload_at, author, shared_users:[]});
        const photoSaved: IPhoto = await PhotoService.create(photoInstance);
        console.log("Image saved");
        res.json(photoSaved)

      }else if(file.mimetype.includes("video")){// Save video
        const videoInstance:IVideo = new Video({name, path, weight, upload_at, author, shared_users:[]});
        const videoSaved: IVideo = await VideoService.create(videoInstance);
        console.log("Video saved");
        res.json(videoSaved);

      }else {// Save file
        const fileInstance:IFile = new File({name, path, weight, upload_at, author, shared_users:[]});
        const fileSaved: IFile = await FileService.create(fileInstance);
        console.log("File saved");
        res.json(fileSaved);
      }

    } catch (error) {
      console.log(error);
      
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
  public static async download(req: any, res: Response, next: NextFunction) {
    try {
      const { id, author } = req.params;
      const file: IFile | null = await FileService.getById(id);

      if (!file) throw new HttpException(404, 'File not found');
      if( author != file.author) throw new HttpException(403, 'Forbidden: The file is not his authorship.');

      const location = file.path
      console.log("Location:", location);
      
      res.download(location, file.name, err => {
        if (err) {
          throw new HttpException(500, err.message);
        } else {
          console.log(`File ${file.name} downloaded`);
          
        }
      })
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
      const {author } = req.params;
      const filesToRemove = req.body.files
      console.log("Files received: ", filesToRemove);
      
      // If have one file to remove
      if(filesToRemove.length === 1){
        const id = filesToRemove[0]
        const file: IFile | null = await FileService.removeById(id);
        if (!file) throw new HttpException(404, 'File not found');
        if( author != file.author) throw new HttpException(403, 'Forbidden: The file is not his authorship.');
      
        const location = file.path
        fs.unlinkSync(path.resolve(location))
        console.log(`File ${file.name} deleted`);
      }else { // If have multiple files to remove
        filesToRemove.forEach(async (fileId: string) => {
          const file: IFile | null = await FileService.removeById(fileId);
          if (!file) throw new HttpException(404, 'File not found');
          if( author != file.author) throw new HttpException(403, 'Forbidden: The file is not his authorship.');
        
          const location = file.path
          fs.unlinkSync(path.resolve(location))
          console.log(`File ${file.name} deleted`);
        });
      }
      
      res.sendStatus(200)
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

}
export default FileController;
