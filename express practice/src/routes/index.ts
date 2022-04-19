import express, { NextFunction, Request, Response } from 'express'
import students from './api/students'
import teachers from './api/teachers'

const routes = express.Router();

function middleWare(req: Request, res: Response, next: NextFunction) {
    console.log(req.url, " was visited")
}

routes.get('/', middleWare)

routes.use('/students', students)
routes.use('/teachers', teachers)

export default routes;