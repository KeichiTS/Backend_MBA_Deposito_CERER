import { Router } from 'express';
import { createLocal, getAllLocais, updateLocal, deleteLocal } from '../controllers/local.controller.js';

const router = Router();

router.post('/', createLocal);
router.get('/', getAllLocais);
router.put('/:id', updateLocal);
router.delete('/:id', deleteLocal);

export default router;