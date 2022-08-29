import { describe, it, expect } from "vitest";
import sum from '../src/index'

describe('sum', () => {
    it('should get right ans', () => {
        expect(sum(1, 2)).toBe(3)
    })
})