import { Router } from 'express';
import { createRejeito, getAllRejeitos, updateRejeito, deleteRejeito } from '../controllers/rejeito.controller.js';

const router = Router();

router.post('/', createRejeito);
router.get('/', getAllRejeitos);
router.put('/:id', updateRejeito);
router.delete('/:id', deleteRejeito);

export default router;