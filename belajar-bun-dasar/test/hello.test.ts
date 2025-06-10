import { describe, it, expect } from "bun:test";
import { sayHello } from "../src/hello";

describe('Bun Test Runner', () => {
    it('should support unit test', async() => {
        const response = sayHello("Kurniawan");
        expect(response).toBe("Hello Kurniawan");
    })
    it('should support unit test', async() => {
        const response = sayHello("Elana");
        expect(response).toBe("Hello Elana");
    })
})