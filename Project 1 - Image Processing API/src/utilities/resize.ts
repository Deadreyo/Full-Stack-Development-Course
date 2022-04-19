import sharp from 'sharp'
import pathMaker from './pathMaker'

/**
 * Resizes an image, and creates it.
 * @param file The image file to be resized
 * @param name The name of the input file
 * @param width width of the desired output
 * @param height height of the desired output
 */
export default async function resize(
    file: Buffer,
    name: string,
    width: number,
    height: number
): Promise<void> {
    const result = await sharp(file).resize(width, height)

    await result.toFile(pathMaker(name, width, height))
}
