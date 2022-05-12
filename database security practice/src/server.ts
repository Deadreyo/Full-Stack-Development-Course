import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { UserStore } from './models/user';
import userRoutes from './handlers/users';
import bookRoutes from './handlers/books';

dotenv.config();

const app: express.Application = express()
const address = process.env.ENV=="dev"? 3000 : 8080

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(address, function () {
    console.log(`starting app on: ${address}`)
})

const { POSTGRES_HOST, POSTGRES_DB,
POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, ENV } = process.env;

let client: Pool
if(ENV=="dev") {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
} else {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}



// const client = new Pool({
//     host: POSTGRES_HOST,
//     database: ENV=="dev"? POSTGRES_DB : POSTGRES_DB_TEST,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD
// })
export default client;

function doSomething() {
    // new UserStore().delete(2);
    new UserStore().index()
}
// doSomething();

userRoutes(app);
bookRoutes(app);
console.log(POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD);

