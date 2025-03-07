import { Router } from 'express';
import developerController from '../controllers/DeveloperController';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

router.get('/', developerController.getAll);
router.get('/:id', validateObjectId, developerController.getById);
router.patch('/:id', validateObjectId, developerController.addFeedback);
router.delete('/:id', validateObjectId, developerController.delete);

export default router;