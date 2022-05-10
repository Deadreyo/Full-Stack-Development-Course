import { BookStore } from "../models/book";
import { Request, Response, Application } from "express";

const store = new BookStore();

async function index(req: Request, res: Response) {
    try{
        const books = await store.index()
        if(books) {
            res.json(books);
        }
    } catch(e) {
        res.status(400)
        res.json(e.message)
    }
}

async function show(req: Request, res: Response) {
    try{
        const {id} = req.params
        const book = await store.find(+id)
        if(book) {
            res.json(book);
        }
    } catch(e) {
        res.status(400)
        res.json(e.message)
    }
}

async function create(req: Request, res: Response) {
    try{
        // const book = await store.create({
        //     author: ,
        //     summary: ,
        //     title: ,
        //     total_pages: ,
        //     type: ,
        //     id: 0,
        // })
        // if(book) {
            res.send("created...");
        // }
    } catch(e) {
        res.status(400)
        res.json(e.message)
    }
}

async function Delete(req: Request, res: Response) {
    try{
        const {id} = req.params;
        await store.delete(+id)
        res.send("deleted...");
    } catch(e) {
        console.log(e)
        res.status(400)
        res.json(e.message)
    }
}

export default function bookRoutes(app: Application) {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.post('/books', create);
    app.delete('/books/:id', Delete)
}