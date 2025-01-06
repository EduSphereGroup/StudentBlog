import { Router } from 'express';
import userController from '../../../interfaces/controllers/UserController';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;