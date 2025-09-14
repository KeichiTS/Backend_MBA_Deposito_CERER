import { Router } from 'express';
import { createRejeitoRadionuclideo, getAllRejeitosRadionclideos, updateRejeitoRadionuclideo, deleteRejeitoRadionuclideo } from '../controllers/rejeito_radionuclideo.controller.js';

const router = Router();

router.post('/', createRejeitoRadionuclideo);
router.get('/', getAllRejeitosRadionclideos);
router.put('/:id', updateRejeitoRadionuclideo);
router.delete('/:id', deleteRejeitoRadionuclideo);

export default router;