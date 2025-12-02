import { readFileSync } from "fs"
import { describe, expect, it } from "vitest"
import { solvePart1, solvePart2 } from "./Day2"

describe("Day 2", () => {
    const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf8").split(",")
    const input = readFileSync(new URL("./input.txt", import.meta.url), "utf8").split(",")

    describe("Part 1", () => {
        it("should solve the sample input", () => {
            expect(solvePart1(sample)).toBe(1227775554)
        })

        it("should solve the actual input", () => {
            const result = solvePart1(input)
            console.log("Day 2 - Part 1: ", result)

            expect(result).toBeDefined()
        })
    })
    
    describe("Part 2", () => {
        it("should solve the sample input", () => {
            expect(solvePart2(sample)).toBe(4174379265)
        })

        it("should solve the actual input", () => {
            const result = solvePart2(input)
            console.log("Day 2 - Part 1: ", result)

            expect(result).toBeDefined()
        })
    })
})