import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { solvePart1, solvePart2 } from "./Solution";


describe("Day 1", () => {
    const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf8").split(/\r?\n/);
    const input = readFileSync(new URL("./input.txt", import.meta.url), "utf8").split(/\r?\n/);

    describe("Part 1", () => {
        it("should solve the sample input", () => {
            expect(solvePart1(sample)).toBe(3);
        })

        it("should solve the actual input", () => {
            const result = solvePart1(input);
            console.log("Day 1 - Part 1: ", result);

            expect(result).toBe(1021);
        })
    })

    describe("Part 2", () => {
        it("should solve the sample input", () => {
            expect(solvePart2(sample)).toBe(6);
        })

        it("should solve the actual input", () => {
            const result = solvePart2(input);
            console.log("Day 1 - Part 2: ", result);

            expect(result).toBe(5933);
        })
    })
})
