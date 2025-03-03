import express from 'express'
import {
  listApplications,
  createApplication,
  updateApplicationStatus,
} from '../controllers/applicationControllers'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware(['manager', 'tenant']), listApplications)
router.post('/', authMiddleware(['tenant']), createApplication)
router.put('/:id', authMiddleware(['manager']), updateApplicationStatus)

export default router
