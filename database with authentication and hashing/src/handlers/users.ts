import { User, UserStore } from "../models/userModel";
import { Request, Response, Application } from "express";
import jwt from 'jsonwebtoken'
import verifyAuthToken from "../middleware/AuthToken";

const store = new UserStore();
// const store = undefined as unknown as UserStore;

async function index(req: Request, res: Response) {
    try{
        const users = await store.index()
        if(users) {
            res.json(users);
        }
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

async function show(req: Request, res: Response) {
    try{
        const {id} = req.params
        const User = await store.find(+id)
        if(User) {
            res.json(User);
        } else {
            res.status(404).json("Not Found")
        }
    } catch(e) {
        res.status(500)
        res.json(e+"")
    }
}

async function create(req: Request, res: Response) {
    try{
        const User = req.body as User
        const created = await store.create(User)
        let token = jwt.sign({user: created}, process.env.TOKEN_SECRET!)
        res.json(token);
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

async function Delete(req: Request, res: Response) {
    try{
        const {id} = req.params;
        const deleted = await store.delete(+id)
        if(deleted) {
            res.send("deleted...");
        } else {
            res.status(404).json("Not Found")
        }
    } catch(e) {
        console.log(e)
        res.status(400)
        res.json(e+"")
    }
}

async function update(req: Request, res: Response) {
    try{
        const User = req.body as User
        const {id} = req.params
        const updated = await store.update(User, +id)
        if(updated) {
            res.send("updated...");
        } else {
            res.status(404).json("Not Found")
        }
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

async function authenticate(req: Request, res: Response) {
    try{
        const {username, password} = req.body
        const user = await store.authenticate(username, password)
        if(user) {
            let token = jwt.sign(user, process.env.TOKEN_SECRET!);
            res.json(token);
        } else {
            res.status(400).json("Error authenticating")
        }

    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

export default function userRoutes(app: Application) {
    app.get('/users', index);
    app.get('/users/auth', authenticate)
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken, Delete)
    app.put('/users/:id', verifyAuthToken, update)
}