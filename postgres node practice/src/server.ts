import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { BookStore } from './models/book';
import bookRoutes from './handlers/books';

dotenv.config();

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB,
POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
})
export default client;

function doSomething() {
    new BookStore().delete(2);
    new BookStore().index()
}
// doSomething();

bookRoutes(app);
console.log(POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD);

