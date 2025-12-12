interface Range {
    min: number
    max: number
}

function parseRange(rangeStr: string): Range {
    const [minStr, maxStr] = rangeStr.split('-')
    return {
        min: Number(minStr),
        max: Number(maxStr),
    }
}

function splitRangesAndIngredients(inputLines: string[]): { ranges: Range[], ingredients: number[] } {
    const splitIndex = inputLines.indexOf('')

    const rangeLines = inputLines.slice(0, splitIndex)
    const ingredientLines = inputLines.slice(splitIndex + 1)

    return {
        ranges: rangeLines.map(parseRange),
        ingredients: ingredientLines.map(Number)
    }
}

export function solvePart1(input: string[]): number {
    const { ranges, ingredients } = splitRangesAndIngredients(input)

    return ingredients
        .filter(ingredient => ranges
            .some(range => ingredient >= range.min && ingredient <= range.max))
        .length
}

function getNumberOfElementsInRange(range: Range): number {
    return range.max - range.min + 1
}

export function solvePart2(input: string[]): number {
    const { ranges } = splitRangesAndIngredients(input)

    const sortedRanges = ranges.sort((a, b) => a.min - b.min)

    const mergedRanges: Range[] = []

    for (const range of sortedRanges) {
        if (mergedRanges.length === 0) {
            // No ranges yet -> add it directly
            mergedRanges.push({ ...range })

        } else if (mergedRanges[mergedRanges.length - 1].max < range.min) {
            // New range has no overlap with previous range -> add it as new range
            mergedRanges.push({ ...range })

        } else {
            // New range overlaps with latest -> merge them by increasing the max of the latest range
            mergedRanges[mergedRanges.length - 1].max = Math.max(mergedRanges[mergedRanges.length - 1].max, range.max)
        }
    }


    return mergedRanges.reduce((sum, currentRange) => sum + getNumberOfElementsInRange(currentRange), 0)
}
