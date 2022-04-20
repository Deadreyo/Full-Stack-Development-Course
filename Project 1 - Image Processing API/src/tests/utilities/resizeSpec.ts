import { existsSync } from 'fs'
import { readFile, unlink } from 'fs/promises'
import resize from '../../utilities/resize'

const testFileName = 'image4'
const comapareObjName = 'test'
const width = 400
const height = 500

describe('Testing Utilities and Sharp Library', () => {
    describe('Resizing Image Utility', () => {
        it('resizes an image successfully and writes to file', async () => {
            const file = await readFile(`./images/full/${testFileName}.jpg`)
            await resize(file, 'image4', width, height)
            expect(
                existsSync(
                    `./images/thum/${testFileName}W${width}H${height}.jpg`
                )
            ).toBeTrue()
        })
        it(`expects the output to be equal to test.jpg object`, async () => {
            const output = await readFile(
                `./images/thum/${testFileName}W${width}H${height}.jpg`
            )
            const compare = await readFile(
                `./images/thum/${comapareObjName}.jpg`
            )
            expect(output).toEqual(compare)
        })
        afterAll(async () => {
            unlink(`./images/thum/${testFileName}W${width}H${height}.jpg`)
        })
    })
})
