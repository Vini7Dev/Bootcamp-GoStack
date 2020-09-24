import { Router } from 'express';
import multer from 'multer';

import EnsureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersControllers from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersControllers.create);

usersRouter.patch('/avatar', EnsureAuth, upload.single('avatar'), userAvatarController.update);

export default usersRouter;