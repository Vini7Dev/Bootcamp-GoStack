import { Router } from 'express';
import multer from 'multer';

import EnsureAuth from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarUserSerice from '../services/UpdateAvatarUserSerice';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        const createUserService = new CreateUserService();

        const { id, name, email, created_at, updated_at } = await createUserService.execute({
            name: data.name,
            email: data.email,
            password: data.password
        });

        const user = {
            id,
            name,
            email,
            created_at,
            updated_at
        };

        return res.json(user);
    }catch(err) {
        return res.status(400).json({ error: err });
    }
});

usersRouter.patch('/avatar', EnsureAuth, upload.single('avatar'), async (req, res) => {

    try{
        const updateAvatarUser = new UpdateAvatarUserSerice();
        
        const { id, name, email, avatar, created_at, updated_at } = await updateAvatarUser.execute({
            userId: req.user.id,
            avatarFileName: req.file.filename 
        });

        const user = {
            id, name, email, avatar, created_at, updated_at
        }

        return res.json(user);
    }catch(err){
        return res.status(400).json({ error: err });
    }
    

});

export default usersRouter;