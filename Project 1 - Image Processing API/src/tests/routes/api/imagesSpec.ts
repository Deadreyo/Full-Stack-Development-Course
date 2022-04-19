import { existsSync } from 'fs'
import { unlink } from 'fs/promises'
import supertest from 'supertest'
import app from '../../../app'

describe('Testing Server Endpoints', () => {
    it('gets an existing image from the server successfully', async () => {
        await supertest(app)
            .get('/api/image4?width=300&height=200')
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
    })
    it('creates an image successfully', () => {
        expect(existsSync(`./images/thum/image4W300H200.jpg`)).toEqual(true)
    })
    it('handles getting an non-existing image from the server successfully', async () => {
        await supertest(app)
            .get('/api/nonee?width=300&height=200')
            .expect(404)
            .expect('<h3>Image not found.</h3>')
    })
    afterAll(() => {
        unlink(`./images/thum/image4W300H200.jpg`)
    })
})
