import express from 'express';
import { getFriendsByUserId } from '..//controllers/friendController';

const router = express.Router();

router.get('/:userId', getFriendsByUserId);

export default router;
