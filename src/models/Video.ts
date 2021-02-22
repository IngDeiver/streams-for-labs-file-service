import mongoose, { Model, Schema } from 'mongoose';
import { IVideo } from '../interfaces';

const VideoSchema: Schema<IVideo> = new Schema({
    name: {type: String, required: true},
    path: {type: String, required: true},
    weight: {type: Number, required: true},
    upload_at: {type: Date, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    shared_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});


const Video: Model<IVideo> = mongoose.model('Video', VideoSchema);
export default Video;
