import client from "../server";

export type orders_products = {
    id: number,
    order_id: number,
    product_id: number,
    quantity: number
}

export default class orders_productsStore {

    async index(): Promise<orders_products[]> {
        try {
            let con = await client.connect();
            let query = `SELECT * FROM orders_products`;
            let result = await con.query(query);
            con.release();
            return result.rows;
        } catch (e) {
            throw new Error("Error on fetching orders_products: "+e);
        }
    }
}