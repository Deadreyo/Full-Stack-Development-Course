import express from 'express'
import images from './api/images'

const api = express.Router()

api.get('/', (req, res) => {
    res.send(`
        <h3>Main Api Page</h3>
        <h4>Available Images:</h4>
        <ul>
            <li> image1
            <li> image2
            <li> image3
            <li> image4
            <li> image5
        </ul>
    `)
})
api.use('/', images)

export default api
