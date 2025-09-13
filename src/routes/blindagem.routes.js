import { Router } from 'express';
import { createBlindagem, getAllBlindagens, updateBlindagem, deleteBlindagem } from '../controllers/blindagem.controller.js';

const router = Router();

router.post('/', createBlindagem);
router.get('/', getAllBlindagens);
router.put('/:id', updateBlindagem);
router.delete('/:id', deleteBlindagem);

export default router;