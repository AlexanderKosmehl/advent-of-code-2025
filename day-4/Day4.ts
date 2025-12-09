function getNumberOfSurroundingStacks(x: number, y: number, grid: string[][]): number {
    let count = 0

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            // The stack itself
            if (xOffset === 0 && yOffset === 0) continue

            // Out of bounds
            if (x + xOffset < 0 || x + xOffset >= grid[0].length) continue
            if (y + yOffset < 0 || y + yOffset >= grid.length) continue

            // Actual stack check
            if (grid[y + yOffset][x + xOffset] === '@') {
                count++
            }
        }
    }

    return count
}

export function solvePart1(input: string[][]): number {
    let accessibleStacks = 0

    for (let xPosition = 0; xPosition < input[0].length; xPosition++) {
        for (let yPosition = 0; yPosition < input.length; yPosition++) {
            // Not a stack itself
            if (input[yPosition][xPosition] !== '@') continue

            if (getNumberOfSurroundingStacks(xPosition, yPosition, input) < 4) {
                accessibleStacks++
            }
        }
    }

    return accessibleStacks
}

interface Position {
    x: number
    y: number
}

function getRemovableStackPositions(grid: string[][]): Position[] {
    const removablePositions: Position[] = []

    for (let xPosition = 0; xPosition < grid[0].length; xPosition++) {
        for (let yPosition = 0; yPosition < grid.length; yPosition++) {
            // Not a stack itself
            if (grid[yPosition][xPosition] !== '@') continue

            if (getNumberOfSurroundingStacks(xPosition, yPosition, grid) < 4) {
                removablePositions.push({ x: xPosition, y: yPosition })
            }
        }
    }

    return removablePositions
}

function removePositionsFromGrid(positions: Position[], grid: string[][]): void {
    for (const pos of positions) {
        grid[pos.y][pos.x] = '.'
    }
}

export function solvePart2(input: string[][]): number {
    // deep copy input since modifications will be in place
    const currentState = input.map(line => line.slice())

    let totalRemovedStacks = 0
    let removedStacks = -1

    while (removedStacks !== 0) {
        const removablePositions = getRemovableStackPositions(currentState)

        removedStacks = removablePositions.length
        totalRemovedStacks += removedStacks

        removePositionsFromGrid(removablePositions, currentState)
    }


    return totalRemovedStacks
}