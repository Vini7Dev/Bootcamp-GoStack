import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');

interface IUploadConfig {
    driver: 'disk' | 's3';

    tempFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    }

    config: {
        disk: {};
        aws: {
            bucket: string;
        }
    }
}

export default {
    driver: process.env.STORAGE_DRIVER || 'disk',
    tempFolder,
    uploadsFolder,

    multer: {
        storage: multer.diskStorage({
            destination: tempFolder,
            filename: (req, file, callback) => {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;
    
                return callback(null, filename);
            }
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber'
        }
    }
}as IUploadConfig;