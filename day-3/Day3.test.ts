import { readFileSync } from "fs"
import { describe, expect, it } from "vitest"
import { solvePart1, solvePart2 } from "./Day3"

// get filename and extract day number
const currentDay = __filename.match(/Day(\d+)/)?.[1]

describe(`Day ${currentDay}`, () => {
    const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf8").split(/\r?\n/)
    const input = readFileSync(new URL("./input.txt", import.meta.url), "utf8").split(/\r?\n/)

    describe("Part 1", () => {
        it("should solve the sample input", () => {
            expect(solvePart1(sample)).toBe(357)
        })

        it("should solve the actual input", () => {
            const result = solvePart1(input)
            console.log(`Day ${currentDay} - Part 1: `, result)

            expect(result).toBeDefined()
        })
    })

    describe("Part 2", () => {
        it("should solve the sample input", () => {
            expect(solvePart2(sample, 12)).toBe(3121910778619)
        })

        it("should match part 1 solution for chain length 2", () => {
            expect(solvePart2(sample, 2)).toBe(solvePart1(sample))
        })

        it("should solve the actual input", () => {
            const result = solvePart2(input, 12)
            console.log(`Day ${currentDay} - Part 2: `, result)

            expect(result).toBeDefined()
        })
    })
})