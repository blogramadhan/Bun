import { z } from "zod";

const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

const result = loginValidation.parse({ email: "test@test.com", password: "12345678" });
console.info(result);