import express from 'express'
import RequestController from '../controllers/RequestController'

export const router = express.Router()
router.get('/closeContactFlag', RequestController.getCloseContactFlag)