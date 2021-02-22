import { Document } from 'mongoose';

/**
 * Define a user interface to managament with mongoose
 * @category Interfaces
 * @interface   IFile
 * @extends {Document}
 */
interface   IFile extends Document{
    name: string,
    path: string,
    weight: number,
    upload_at: Date,
    author: string,
    shared_users: Array<String>,
}
export default  IFile;
