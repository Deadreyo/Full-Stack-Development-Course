const dirPath = './images/thum'

export default function pathMaker(
    name: string,
    width: number,
    height: number
): string {
    return `${dirPath}/${name}W${width}H${height}.jpg`
}
