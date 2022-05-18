import client from "../server";

export type Product = {
    id: number,
    name: string,
    price: number
}

export default class productStore {

    async index(): Promise<Product[]> {
        try {
            let con = await client.connect()
            let query = `SELECT * FROM products`
            let result = await con.query(query)
            con.release();
            return result.rows
        } catch (e) {
            throw new Error("Error on fetching products: "+e);
            
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            let con = await client.connect()
            let query = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;`
            let result = await con.query(query, [product.name, product.price])
            con.release();
            console.log("Product created: ", result.rows[0])
            return result.rows[0]
        } catch (e) {
            throw new Error("Error on creating product: "+e);
        }
    }
}