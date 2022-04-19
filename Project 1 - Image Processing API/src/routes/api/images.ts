import express from 'express'
import imageWare from '../../middleware/imageProcessingWare'
// import api from '..';

const images = express.Router()

images.get('/:name', imageWare)

export default images
