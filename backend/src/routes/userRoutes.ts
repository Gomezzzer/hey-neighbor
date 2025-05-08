import { Router } from 'express';
import { getUserById, updateUserById } from '../controllers/userController';

const router = Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserById);

export default router;

