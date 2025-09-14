import { Router } from 'express';
import { createRejeitoMaterial, getAllRejeitosMateriais, updateRejeitoMaterial, deleteRejeitoMaterial } from '../controllers/rejeito_material.controller.js';

const router = Router();

router.post('/', createRejeitoMaterial);
router.get('/', getAllRejeitosMateriais);
router.put('/:id', updateRejeitoMaterial);
router.delete('/:id', deleteRejeitoMaterial);

export default router;