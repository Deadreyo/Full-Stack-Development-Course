import supertest from 'supertest'
import app from '../app'

describe('Testing Main API endpoint', () => {
    it('gets /api sucessfully', () => {
        supertest(app)
            .get('/api')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
    })
})
