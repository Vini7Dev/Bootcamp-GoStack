import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import EnsureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersControllers from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersControllers.create);

usersRouter.patch('/avatar', EnsureAuth, upload.single('avatar'), userAvatarController.update);

export default usersRouter;