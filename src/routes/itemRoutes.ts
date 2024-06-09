import { Router } from 'express';
import { createItem, listItem, placeBid } from '../controller/itemController';

const router = Router();

router.post('/items', createItem);
router.get('/items', listItem);
router.post('/items/bid', placeBid);

export default router;
