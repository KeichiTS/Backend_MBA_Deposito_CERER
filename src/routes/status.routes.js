import { Router } from 'express';
import { createStatus, getAllStatus, updateStatus, deleteStatus } from '../controllers/status.controller.js';

const router = Router();

router.post('/', createStatus);
router.get('/', getAllStatus);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

export default router;