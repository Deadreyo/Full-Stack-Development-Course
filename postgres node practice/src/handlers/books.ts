import { Book, BookStore } from "../models/book";
import { Request, Response, Application } from "express";

// const store = new BookStore();
const store = undefined as unknown as BookStore;

async function index(req: Request, res: Response) {
    try{
        const books = await store.index()
        if(books) {
            res.json(books);
        }
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

async function show(req: Request, res: Response) {
    try{
        const {id} = req.params
        const book = await store.find(+id)
        if(book) {
            res.json(book);
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
        const book = req.body as Book
        const created = await store.create(book)
        res.json("Sucessfully created...");
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

export default function bookRoutes(app: Application) {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.post('/books', create);
    app.delete('/books/:id', Delete)
}