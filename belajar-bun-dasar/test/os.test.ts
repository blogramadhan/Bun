import { describe, it, expect } from "bun:test";
import * as os from "node:os";

describe('NodeJS API', () => {
    it('should support os package', async() => {
        const arch = os.arch();
        expect(arch).toBe("x64");
    });
});