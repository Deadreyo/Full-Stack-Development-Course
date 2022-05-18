import client from "../server";
import { orders_products } from "./orders-products Model";
import { Product } from "./productModel";

export type Order = {
    id: number,
    status: string,
    user_id: number,
}

export default class orderStore {

    async index(): Promise<Order[]> {
        try {
            let con = await client.connect();
            const query = `SELECT * FROM orders`
            let results = await con.query(query);
            con.release();
            return results.rows
        } catch (e) {
            throw new Error("Error fetching orders: "+e);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            let con = await client.connect();
            const query = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;`
            let result = await con.query(query, [order.status, order.user_id])
            con.release();
            console.log("Order created: ", result.rows[0])
            return result.rows[0]
        } catch (e) {
            throw new Error("Error creating order: "+e);
        }
    }

    async addProduct(orderId: number, productId: number, quantity: number): Promise<orders_products> {
        try {
            let con = await client.connect();
            const query = `INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;`
            let result = await con.query(query, [orderId, productId, quantity])
            con.release();
            console.log("Product added to order: ", result.rows[0])
            return result.rows[0]
        } catch (e) {
            throw new Error("Error adding product to order: "+e);
        }
    }
}