import { Application, Request, Response } from "express";
import orderStore from "../models/orderModel";

const store = new orderStore();

async function index(req: Request, res: Response) {
    try{
        const orders = await store.index()
        if(orders) {
            res.json(orders);
        }
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

async function addProduct(req: Request, res: Response) {
    try{
        const {orderId, productId, quantity} = req.body
        const added = await store.addProduct(+orderId, +productId, +quantity)
        if(added) {
            res.json("Sucessfully added...");
        }
    } catch(e) {
        res.status(400)
        res.json(e+"")
    }
}

export default function ordersRoutes(app: Application) {
    app.get('/orders', index);
    app.post('/orders/addProduct', addProduct);
}