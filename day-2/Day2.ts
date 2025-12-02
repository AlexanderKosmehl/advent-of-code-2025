function extractIdsFromRange(rangeString: string): string[] {
    const [start, end] = rangeString.split("-")

    const extractedIds: string[] = []

    for (let currentId = parseInt(start); currentId <= parseInt(end); currentId++) {
        extractedIds.push(currentId.toString())
    }

    return extractedIds
}

function isValidPart1(id: string): boolean {
    // ids with an odd length cant be symetric -> always valid
    if (id.length % 2 !== 0) return true

    const mid = id.length / 2
    const firstHalf = id.substring(0, mid)
    const secondHalf = id.substring(mid)

    // only symmetric ids are invalid
    if (firstHalf === secondHalf) return false

    // no condition matches -> invalid
    return true
}

function isValidPart2(id: string): boolean {
    const validFractions: number[] = []
    for (let possibleFractionLength = 1; possibleFractionLength <= Math.floor(id.length / 2); possibleFractionLength++) {
        if (id.length % possibleFractionLength !== 0) continue

        // fraction length divides id length -> check symmetry
        validFractions.push(possibleFractionLength)
    }

    // check id for symmetry of all possible lengths
    for (const fractionLength of validFractions) {
        const idFractions: string[] = []

        for (let fractionStartIndex = 0; fractionStartIndex < id.length; fractionStartIndex += fractionLength) {
            idFractions.push(id.substring(fractionStartIndex, fractionStartIndex + fractionLength))
        }

        // all fractions are the same -> symmetric id
        if (idFractions.every((fraction) => fraction === idFractions[0])) return false
    }

    // no symmetry found -> valid id
    return true
}

function genericSolver(idRanges: string[], filterFn: (id: string) => boolean): number {
    const extracedIds = idRanges.flatMap((range) => extractIdsFromRange(range))

    const invalidIds = extracedIds.filter(filterFn)

    return invalidIds.reduce((sum, id) => sum + parseInt(id), 0)
}

export function solvePart1(idRanges: string[]): number {
    return genericSolver(idRanges, (id) => !isValidPart1(id))
}

export function solvePart2(idRanges: string[]): number {
    return genericSolver(idRanges, (id) => !isValidPart2(id))
}