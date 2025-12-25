interface PresentShape {
    shape: string[][]
    variants: string[][][]
}

interface PuzzleRegion {
    size: {
        width: number,
        height: number
    }
    presentCounts: number[]
}

interface PresentPuzzle {
    presentShapes: PresentShape[]
    regions: PuzzleRegion[]
}

function getShapeVariants(shape: string[][]): string[][][] {
    const variants: string[][][] = []
    const seen = new Set<string>()

    const matrixToString = (matrix: string[][]): string =>
        JSON.stringify(matrix)

    const isUnique = (matrix: string[][]): boolean => {
        const key = matrixToString(matrix)
        if (seen.has(key)) return false
        seen.add(key)
        return true
    }

    const rotateClockwise = (matrix: string[][]): string[][] => {
        const n = matrix.length
        const rotated: string[][] = Array(n).fill(null).map(() => Array(n))
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j]
            }
        }
        return rotated
    }

    const flipHorizontal = (matrix: string[][]): string[][] => {
        return matrix.map(row => [...row].reverse())
    }

    // Generate all 8 variants: 4 rotations + 4 rotations of flipped version
    let current = shape.map(row => [...row])

    // Add all 4 rotations
    for (let rotation = 0; rotation < 4; rotation++) {
        if (isUnique(current)) {
            variants.push(current.map(row => [...row]))
        }
        current = rotateClockwise(current)
    }

    // Add 4 rotations of the flipped version (only need one flip type)
    current = flipHorizontal(shape)
    for (let rotation = 0; rotation < 4; rotation++) {
        if (isUnique(current)) {
            variants.push(current.map(row => [...row]))
        }
        current = rotateClockwise(current)
    }

    return variants
}

function parseInput(input: string): PresentPuzzle {
    const parts = input.split(/\r?\n\r?\n/)
    const puzzleShapes = parts.slice(0, -1)
    const puzzleRegions = parts.at(-1)

    if (!puzzleRegions) throw new Error()

    const presentShapes: PresentShape[] = puzzleShapes.map(shapeStrings => {
        const shape = shapeStrings
            .split(/\r?\n/)
            .slice(1)
            .map(line => line.split(''))

        return {
            shape,
            variants: getShapeVariants(shape)
        }
    })

    const regions: PuzzleRegion[] = puzzleRegions.split("\n").map(regionString => {
        const [sizeString, countsString] = regionString.split(':')
        const [width, height] = sizeString.split('x').map(Number)
        const presentCounts = countsString.trim().split(' ').map(Number)

        return {
            size: { width, height },
            presentCounts
        }
    })

    return {
        presentShapes,
        regions: regions
    }
}

export function solvePart1(input: string): number {
    const puzzles = parseInput(input)

    return 0
}

export function solvePart2(input: string): number {
    console.log(input)
    return 0
}