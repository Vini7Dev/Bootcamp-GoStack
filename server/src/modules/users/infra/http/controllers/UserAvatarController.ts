import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUserSerice from '@modules/users/services/UpdateAvatarUserService';

class UserAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateAvatarUser = container.resolve(UpdateAvatarUserSerice);
        
        const { id, name, email, avatar, created_at, updated_at } = await updateAvatarUser.execute({
            userId: req.user.id,
            avatarFileName: req.file.filename 
        });
    
        const user = {
            id, name, email, avatar, created_at, updated_at
        }
    
        return res.json(user);
    }
}

export default UserAvatarController;