import { readFileSync } from "fs"
import { beforeEach, describe, expect, it } from "vitest"
import { solvePart1, solvePart2 } from "./Day7"

// get filename and extract day number
const currentDay = __filename.match(/Day(\d+)/)?.[1]

describe(`Day ${currentDay}`, () => {

    const getSample = () => readFileSync(new URL("./sample.txt", import.meta.url), "utf8").split(/\r?\n/).map(line => line.split(''))
    const getInput = () => readFileSync(new URL("./input.txt", import.meta.url), "utf8").split(/\r?\n/).map(line => line.split(''))

    let sample: string[][]
    let input: string[][]

    // Solver modifies input in place so it has to be restored before each test
    beforeEach(() => {
        sample = getSample()
        input = getInput()
    })

    describe("Part 1", () => {
        it("should solve the sample input", () => {
            expect(solvePart1(sample)).toBe(21)
        })

        it("should solve the actual input", () => {
            const result = solvePart1(input)
            console.log(`Day ${currentDay} - Part 1: `, result)

            expect(result).toBeDefined()
        })
    })

    describe("Part 2", () => {
        it("should solve the sample input", () => {
            expect(solvePart2(sample)).toBe(40)
        })


        it("should solve the actual input", () => {
            const result = solvePart2(input)
            console.log(`Day ${currentDay} - Part 2: `, result)

            expect(result).toBeDefined()
        })
    })
})