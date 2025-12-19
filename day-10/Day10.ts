interface Machine {
    lightTarget: boolean[]
    buttons: number[][]
    joltages: number[]
}

function parseMachinesFromInput(input: string[]): Machine[] {
    // Example: [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
    return input.map(line => {
        const inputParts = line.split(" ")

        const lightTarget = inputParts[0].split("").slice(1, -1).map(char => char === "#")
        const buttons = inputParts.slice(1, -1).map(part => part.slice(1, -1).split(",").map(Number))
        const joltages = inputParts[inputParts.length - 1].slice(1, -1).split(",").map(Number)

        return { lightTarget, buttons, joltages }
    })
}

function generateButtonPressPermutations(numberOfButtons: number, maxAttempts: number): number[][] {
    if (numberOfButtons === 0) return [[]]

    const permutations: number[][] = []
    const subPermutations = generateButtonPressPermutations(numberOfButtons - 1, maxAttempts)

    for (let singleButtonPresses = 0; singleButtonPresses <= maxAttempts; singleButtonPresses++) {
        for (const subPermutation of subPermutations) {
            permutations.push([singleButtonPresses, ...subPermutation])
        }
    }

    return permutations
}

function simulateButtonPresses(machine: Machine, buttonPresses: number[]): boolean[] {
    const lights = Array(machine.lightTarget.length).fill(false)

    for (let buttonIndex = 0; buttonIndex < buttonPresses.length; buttonIndex++) {
        const lightsToggledByButton = machine.buttons[buttonIndex]
        const numberOfPresses = buttonPresses[buttonIndex]

        for (let i = 0; i < numberOfPresses; i++) {
            for (const lightToggledByButton of lightsToggledByButton) {
                lights[lightToggledByButton] = !lights[lightToggledByButton]
            }
        }
    }

    return lights
}

export function solvePart1(input: string[]): number {
    const machines = parseMachinesFromInput(input)
    const maxAttemptsPerButton = 2
    let sumOfOptima = 0

    for (const machine of machines) {
        let machineOptimum = Infinity

        const buttonPressPermutations = generateButtonPressPermutations(machine.buttons.length, maxAttemptsPerButton)

        for (const buttonPermutation of buttonPressPermutations) {
            const resultingLights = simulateButtonPresses(machine, buttonPermutation)
            if (resultingLights.every((light, index) => light === machine.lightTarget[index])) {
                const totalPresses = buttonPermutation.reduce((a, b) => a + b, 0)
                if (totalPresses < machineOptimum) {
                    machineOptimum = totalPresses
                }
            }
        }

        sumOfOptima += machineOptimum
    }

    return sumOfOptima
}

export function solvePart2(input: string[]): number {
    console.log(input)
    return 0
}