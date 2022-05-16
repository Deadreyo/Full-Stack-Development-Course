import client from "../server";
import bcrypt from 'bcrypt'

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try{
            const con = await client.connect()
            const sql = `SELECT * FROM users;`
            const result = await con.query(sql)
            con.release();
            return result.rows
        } catch(e) {
            throw new Error("Error fetching users "+e);
        }
    }

    async create(user: User): Promise<User> {
        try{
            const con = await client.connect();
            const sql = `INSERT INTO users (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *;`
            const {SALT_ROUNDS: saltRounds, BCRYPT_PASSWORD: pepper} = process.env
            console.log(saltRounds, " ",pepper)
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds!));
            const result = await con.query(sql, [user.first_name, user.last_name, user.username, hash])
            console.log("User created: ",result.rows[0])
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error creating user "+e);
        }
    }

    async update(user: User, id: number): Promise<User> {
        try{
            const con = await client.connect();
            const sql = `UPDATE users SET first_name = $1, last_name = $2, username = $3, password_digest = $4 WHERE id = $5 RETURNING *;`
            const {SALT_ROUNDS: saltRounds, BCRYPT_PASSWORD: pepper} = process.env
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds!));
            const result = await con.query(sql, [user.first_name, user.last_name, user.username, hash, id])
            console.log("User updated: ", result.rows[0])
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error updating user "+e);
        }
    }

    async delete(id: number): Promise<User> {
        try{
            const con = await client.connect();
            const sql = `DELETE FROM users WHERE id = $1 RETURNING *;`
            const result = await con.query(sql, [id])
            console.log("User deleted: ", result.rows[0])
            con.release();
            return result.rows[0]
        } catch(e) {
            throw new Error("Error deleting user "+e);
        }
    }

    async find(id: number): Promise<User> {
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users WHERE id = ${id};`
            const result = await con.query(sql)
            con.release();
            return result.rows[0]
        } catch(e) {
            console.log(e)
            throw new Error("Error finding user "+e);
        }
    }

    async authenticate(username: string, password: string): Promise<User|null>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users WHERE username = $1;`
            const result = await con.query(sql, [username])
            const user = result.rows[0]
            con.release();
            if(user) {
                const {SALT_ROUNDS: saltRounds, BCRYPT_PASSWORD: pepper} = process.env
                console.log(saltRounds, " ",pepper, " ", user.password_digest, " ", password)

                if(bcrypt.compareSync(password + pepper, user.password_digest)) {
                    return user;
                } else {
                    console.log("Password incorrect")
                }
            }

            return null
        } catch(e) {
            throw new Error("Error authenticating user "+e);
        }
    }
}