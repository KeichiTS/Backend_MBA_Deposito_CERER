import { Router } from 'express';
import { createRadionuclideo, getAllRadionuclideos, updateRadionuclideo, deleteRadionuclideo } from '../controllers/radionuclideo.controller.js';

const router = Router();

router.post('/', createRadionuclideo);
router.get('/', getAllRadionuclideos);
router.put('/:id', updateRadionuclideo);
router.delete('/:id', deleteRadionuclideo);

export default router;