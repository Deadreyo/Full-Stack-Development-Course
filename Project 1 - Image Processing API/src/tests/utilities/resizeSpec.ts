import { readFile, unlink } from 'fs/promises'
import resize from '../../utilities/resize'

const testFileName = 'image4'
const width = 400
const height = 500

describe('Testing Utilities and Sharp Library', () => {
    describe('Resizing Image Utility', () => {
        it('resizes an image successfully', async () => {
            const file = await readFile(`./images/full/${testFileName}.jpg`)
            await resize(file, 'image4', width, height)
            expect(true)
        })
        it(`outputs to ./images/thum/${testFileName}W${width}H${height}.jpg`, async () => {
            await readFile(
                `./images/thum/${testFileName}W${width}H${height}.jpg`
            )
            expect(true)
        })
        afterAll(async () => {
            unlink(`./images/thum/${testFileName}W${width}H${height}.jpg`)
        })
    })
})
