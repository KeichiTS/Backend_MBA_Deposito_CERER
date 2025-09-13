import { Router } from 'express';
import { createMaterial, getAllMateriais, updateMaterial, deleteMaterial } from '../controllers/material.controller.js';

const router = Router();

router.post('/', createMaterial);
router.get('/', getAllMateriais);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;