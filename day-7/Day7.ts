function isEmpty(value: string): boolean {
    return value === '.'
}

function isSplitter(value: string): boolean {
    return value === '^'
}

function isTachyonSource(value: string): boolean {
    return value === 'S' || !isNaN(Number(value))
}

function updateRow(input: string[][], rowIndex: number): number {
    let beamsSplit = 0

    for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
        // Prepare cell helpers
        let sourceCell = input[rowIndex - 1][columnIndex]
        if (sourceCell === 'S') sourceCell = '1'

        // Cell above is a regular field -> just continue
        if (!isTachyonSource(sourceCell)) {
            continue
        }

        // Cell above contains tachion beam -> propagate according to content
        // Current cell is empty -> continue beam 
        if (isEmpty(input[rowIndex][columnIndex])) {
            input[rowIndex][columnIndex] = sourceCell.slice()
            continue
        }

        // Current cell contains beam from left splitter -> merge beams from left and above
        if (isTachyonSource(input[rowIndex][columnIndex])) {
            input[rowIndex][columnIndex] = (Number(input[rowIndex][columnIndex]) + Number(sourceCell)).toString()
            continue
        }



        // Current cell is a splitter -> split beam
        if (isSplitter(input[rowIndex][columnIndex])) {
            let hasSplitABeam = false

            // Left cell
            if (!isTachyonSource(input[rowIndex][columnIndex - 1])) {
                // Contains no tachyonBeam -> continue timelines
                input[rowIndex][columnIndex - 1] = sourceCell
                hasSplitABeam = true
            } else {
                // Already contains tachyonBeam -> merge beams from left and this splitter
                input[rowIndex][columnIndex - 1] = (Number(input[rowIndex][columnIndex - 1]) + Number(sourceCell)).toString()
            }

            // Right cell
            if (!isTachyonSource(input[rowIndex][columnIndex + 1])) {
                // Continue timeline count
                input[rowIndex][columnIndex + 1] = sourceCell.slice()
                hasSplitABeam = true
            }

            if (hasSplitABeam) beamsSplit++
        }
    }

    return beamsSplit

}

export function solvePart1(input: string[][]): number {
    input.at(0)?.map(cell => cell === 'S' ? '1' : cell)

    let totalSplits = 0

    for (let rowIndex = 1; rowIndex < input.length; rowIndex++) {
        totalSplits += updateRow(input, rowIndex)
    }

    return totalSplits
}

export function solvePart2(input: string[][]): number {
    for (let rowIndex = 1; rowIndex < input.length; rowIndex++) {
        updateRow(input, rowIndex)
    }

    return input.at(-1)?.map(cell => isEmpty(cell) ? 0 : Number(cell)).reduce((sum, cell) => sum + cell, 0) ?? 0
}   