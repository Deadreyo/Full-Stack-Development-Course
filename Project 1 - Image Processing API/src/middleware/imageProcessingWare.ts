import { Request, Response } from 'express'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import pathMaker from '../utilities/pathMaker'
import resize from '../utilities/resize'

const fromDir = './images/full/'

export default async function imageWare(
    req: Request,
    res: Response
): Promise<void> {
    const originalPath = fromDir + req.params['name'] + '.jpg'

    if (existsSync(originalPath)) {
        try {
            const width = req.query['width']
                ? parseInt(req.query['width'] as string)
                : 400
            const height = req.query['height']
                ? parseInt(req.query['height'] as string)
                : 300
            const newPath = pathMaker(req.params['name'], width, height)
            if (!existsSync(newPath)) {
                const oldImage = await readFile(originalPath)
                await resize(oldImage, req.params['name'], width, height)
            }
            res.sendFile(path.resolve(newPath))
        } catch (e) {
            res.send(`<h3>Server Internal Error!</h3><p>${e}</p>`)
        }
    } else {
        res.statusCode = 404
        res.send('<h3>Image not found.</h3>')
    }
}
