import client from "../server";

export type Book = {
    id: number;
    title: string;
    author: string;
    total_pages: number;
    type: string,
    summary: string
}

export class BookStore {
    async index(): Promise<Book[]> {
        try{
            const con = await client.connect()
            const sql = `SELECT * FROM books;`
            const result = await con.query(sql)
            con.release();
            // console.log(result.rows)
            return result.rows
        } catch(e) {
            throw new Error("Error fetching books "+e);
        }
    }

    async create(book: Book): Promise<Book> {
        try{
            const con = await client.connect();
            const sql = `INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
            const result = await con.query(sql, [book.title, book.author, book.total_pages, book.type, book.summary])
            console.log("Book created: ",result.rows[0])
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error creating book "+e);
        }
    }

    async update(book: Book): Promise<Book> {
        try{
            const con = await client.connect();
            const sql = `UPDATE books SET title = $1, author = $2, total_pages = $3, type = $4, summary = $5 WHERE id = $6 RETURNING *;`
            const result = await con.query(sql, [book.title, book.author, book.total_pages, book.type, book.summary, book.id]);
            console.log("Book updated: ", result.rows[0])
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error updating book "+e);
        }
    }

    async delete(id: number): Promise<void> {
        try{
            const con = await client.connect();
            const sql = `DELETE FROM books WHERE id = $1 RETURNING *;`
            const result = await con.query(sql, [id])
            console.log("Book deleted: ", result.rows[0])
            con.release();
        } catch(e) {
            throw new Error("Error deleting book "+e);
        }
    }

    async find(id: number): Promise<Book> {
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM books WHERE id = ${id};`
            const result = await con.query(sql)
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error finding book "+e);
        }
    }
}