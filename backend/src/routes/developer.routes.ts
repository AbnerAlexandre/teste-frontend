import { Router } from 'express';
import developerController from '../controllers/DeveloperController';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

router.post('/', developerController.create);
router.get('/', developerController.getAll);
router.get('/:id', validateObjectId, developerController.getById);
router.put('/:id', validateObjectId, developerController.update);
router.delete('/:id', validateObjectId, developerController.delete);

export default router;