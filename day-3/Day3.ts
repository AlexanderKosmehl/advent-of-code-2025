function getMaximumJoltageForBank(bankString: string): number {
    let maxJoltage = 0

    for (let firstIndex = 0; firstIndex < bankString.length - 1; firstIndex++) {
        for (let secondIndex = firstIndex + 1; secondIndex < bankString.length; secondIndex++) {
            const joltage = Number(bankString.charAt(firstIndex) + bankString.charAt(secondIndex))
            if (joltage > maxJoltage) {
                maxJoltage = joltage
            }
        }
    }

    return maxJoltage
}

function getMaximumJoltageForBank2(bankString: string, chainLength: number): number {
    // 0 length -> 0 joltage
    if (chainLength <= 0) return 0

    // chain length => bank -> take all digits
    if (chainLength >= bankString.length) return Number(bankString)

    let startIndex = 0
    let optimalBankString = ""

    for (let picked = 0; picked < chainLength; picked++) {
        const remainingPicks = chainLength - picked
        const lastPossibleIndex = bankString.length - remainingPicks
        let bestDigit = -1
        let bestIndex = startIndex

        for (let currentIndex = startIndex; currentIndex <= lastPossibleIndex; currentIndex++) {
            const currentDigit = Number(bankString.charAt(currentIndex))

            if (currentDigit > bestDigit) {
                bestDigit = currentDigit
                bestIndex = currentIndex

                // exit early if we are already using the best possible digit
                if (bestDigit === 9) break
            }
        }

        optimalBankString += String(bestDigit)
        startIndex = bestIndex + 1
    }

    return Number(optimalBankString)
}

export function solvePart1(input: string[]): number {
    return input.reduce((joltageSum, batteryBankString) => joltageSum + getMaximumJoltageForBank(batteryBankString), 0)
}

export function solvePart2(input: string[], chainLength: number): number {
    return input.reduce((joltageSum, batteryBankString) => joltageSum + getMaximumJoltageForBank2(batteryBankString, chainLength), 0)
}   