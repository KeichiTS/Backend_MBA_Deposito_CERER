import { Router } from 'express';
import { createCategoria, getAllCategorias, updateCategoria, deleteCategoria } from '../controllers/categoria.controller.js';

const router = Router();

router.post('/', createCategoria);
router.get('/', getAllCategorias);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

export default router;