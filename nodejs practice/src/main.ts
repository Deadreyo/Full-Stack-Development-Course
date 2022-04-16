import { writeFile } from 'fs';
import fetch from 'node-fetch'

export default async function test() {
    const keyAPI = 'removed'
    const fileId = '1b3o_r6uGRyFWRRKyTH86e9hcaGcqqm7i'
    const link = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${keyAPI}&alt=media`;
    
    try{
        const data =  await fetch(link);
        const status = await data.statusText
        const buffer = await data.buffer()
        console.log(data);
        console.log(`status: `,status);
        // console.log(`text: `, data.text);
        let filePath = `${__dirname}/../file.pdf`
        writeFile(filePath, buffer, () => {
            console.log(filePath);
    })
    } catch(e) {
        console.log(`ERROR: `,e)
    }
}

test();