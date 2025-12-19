interface Position {
    x: number
    y: number
}

function parsePosition(positionString: string): Position {
    const [x, y] = positionString.split(",").map(Number)
    return { x, y }
}

function calculateSize(pos1: Position, pos2: Position): number {
    const width = Math.abs(pos2.x - pos1.x) + 1
    const height = Math.abs(pos2.y - pos1.y) + 1

    return width * height
}

export function solvePart1(input: string[]): number {
    const positions = input.map(parsePosition)

    let maxSize = 0

    for (let firstIndex = 0; firstIndex < positions.length - 1; firstIndex++) {
        for (let secondIndex = firstIndex + 1; secondIndex < positions.length; secondIndex++) {
            const currentSize = calculateSize(positions[firstIndex], positions[secondIndex])

            if (currentSize > maxSize) {
                maxSize = currentSize
            }
        }
    }

    return maxSize
}

export function solvePart2(input: string[]): number {
    console.log(input)
    return 0
}