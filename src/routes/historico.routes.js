import { Router } from 'express';
import { createHistorico, getAllHistoricos, updateHistorico, deleteHistorico } from '../controllers/historico.controller.js';

const router = Router();

router.post('/', createHistorico);
router.get('/', getAllHistoricos);
router.put('/:id', updateHistorico);
router.delete('/:id', deleteHistorico);

export default router;