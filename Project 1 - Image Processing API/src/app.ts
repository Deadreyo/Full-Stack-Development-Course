import express from 'express'
import api from './routes'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('sucess!')
})

app.use('/api', api)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})

export default app
