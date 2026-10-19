import { Router } from 'express'
import { getContentBySection } from '../controllers/contentController.js'

const router = Router()

router.get('/:section', getContentBySection)

export default router
