interface Problem {
    numbers: number[]
    operand: '+' | '*'
}

function findEmptyColumnIndices(input: string[]): number[] {
    const emptyColumnIndices: number[] = []

    for (let columnIndex = 0; columnIndex < input[0].length; columnIndex++) {
        if (input.every(row => row[columnIndex] === ' ')) {
            emptyColumnIndices.push(columnIndex)
        }
    }

    return emptyColumnIndices
}

function extractColumnFromInput(input: string[], startIndex: number, endIndex: number): string[] {
    return input.map(row => row.slice(startIndex, endIndex))
}


function extractHumanStyle(input: string[]): Problem {
    const numberLines = input.slice(0, -1)
    const operandLine = input.at(-1)

    const numbers = numberLines.map(line => line.trim()).map(Number)
    const operand = operandLine?.trim() as '+' | '*'

    return { numbers, operand }
}

function extractCephalopodStyle(input: string[]): Problem {
    const numberLines = input.slice(0, -1)
    const numbers: number[] = []

    for (let currentColumnIndex = numberLines[0].length - 1; currentColumnIndex >= 0; currentColumnIndex--) {
        const charactersInColumn = numberLines.map(line => line[currentColumnIndex])
        numbers.push(Number(charactersInColumn.filter(character => character !== ' ').join('')))
    }

    const operandLine = input.at(-1)
    const operand = operandLine?.trim() as '+' | '*'

    return { numbers, operand }
}

function extractProblemsFromInput(input: string[], extractionFunction: (input: string[]) => Problem): Problem[] {
    const emptyColumnIndices = findEmptyColumnIndices(input)
    // Add simulated splits at start and end of input
    // Since the split indices are exclusive, we use -1 for start
    const splitIndices = [-1, ...emptyColumnIndices, input[0].length]

    const columns: string[][] = []

    for (let currentSplitIndexIndex = 0; currentSplitIndexIndex < splitIndices.length - 1; currentSplitIndexIndex++) {
        // Extract column between current split index and next split index
        // Add 1 to the start make the slice exclusive
        columns.push(extractColumnFromInput(input, splitIndices[currentSplitIndexIndex] + 1, splitIndices[currentSplitIndexIndex + 1]))
    }

    return columns.map(extractionFunction)
}


function performOperation(problem: Problem): number {
    switch (problem.operand) {
        case '+':
            return problem.numbers.reduce((acc, curr) => acc + curr, 0)
        case '*':
            return problem.numbers.reduce((acc, curr) => acc * curr, 1)
    }
}

export function solvePart1(input: string[]): number {
    const problems = extractProblemsFromInput(input, extractHumanStyle)

    return problems.map(performOperation).reduce((acc, curr) => acc + curr, 0)
}

export function solvePart2(input: string[]): number {
    const problems = extractProblemsFromInput(input, extractCephalopodStyle)

    return problems.map(performOperation).reduce((acc, curr) => acc + curr, 0)
}