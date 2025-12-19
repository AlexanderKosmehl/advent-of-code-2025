import { readFileSync } from "fs"
import { describe, expect, it } from "vitest"
import { solvePart1, solvePart2 } from "./Day10"

// get filename and extract day number
const currentDay = __filename.match(/Day(\d+)/)?.[1]

describe(`Day ${currentDay}`, () => {

    const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf8").split(/\r?\n/)
    const input = readFileSync(new URL("./input.txt", import.meta.url), "utf8").split(/\r?\n/)

    describe("Part 1", () => {
        it("should solve the sample input", () => {
            expect(solvePart1(sample)).toBe(7)
        })

        it("should solve the actual input", { timeout: 60_000 }, () => {
            const result = solvePart1(input)
            console.log(`Day ${currentDay} - Part 1: `, result)

            expect(result).toBeDefined()
        })
    })

    describe("Part 2", () => {
        it("should solve the sample input", () => {
            expect(solvePart2(sample)).toBe(24)
        })


        it("should solve the actual input", () => {
            const result = solvePart2(input)
            console.log(`Day ${currentDay} - Part 2: `, result)

            expect(result).toBeDefined()
        })
    })
})