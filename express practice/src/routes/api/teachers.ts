import express from 'express'
import { promises as fs } from 'fs';
import { buffer } from 'stream/consumers';

const teachers = express.Router();

teachers.get('/', async (req, res) => {
    try{
    res.send("Teachers Route");
    const file = await fs.open("test.txt", "a+")
    await file.write("Hello World")
    await file.close()
    await fs.rename("test.txt", "test2.txt")
    await fs.unlink("test2.txt")
    let js: {first_name: string, last_name: string, phone: string}[] = []
    js.forEach((obj) => {
        if(obj.phone === '') obj.phone = "missing data"
    })
    } catch (e) {
        console.log(e)
    }
})

export default teachers;