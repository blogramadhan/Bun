import { describe, it, expect } from "bun:test";

describe('Web API', () => {
    it('should support fetch', async() => {
        const response = await fetch("https://isb.lkpp.go.id/isb-2/api/972895ec-519b-40a6-a612-0f7dc4f7191a/json/30960/Ecat-PaketEPurchasingV6/tipe/4:12/parameter/2025:D197");
        expect(response.headers.get("Content-Type")).toContain("application/json");
        expect(response.status).toBe(200);

        const json = await response.json() as any;
        console.info("Full response:", json);
        
        // Periksa struktur response yang sebenarnya
        expect(json).toBeDefined();
        expect(typeof json).toBe("object");
        
        // Jika response memiliki property data, test ini
        if (json.data && Array.isArray(json.data)) {
            expect(json.data.length).toBeGreaterThan(0);
            const firstData = json.data[0];
            expect(firstData).toBeDefined();
            console.info("First data:", firstData);
        } else {
            // Jika response adalah array langsung
            if (Array.isArray(json)) {
                expect(json.length).toBeGreaterThan(0);
                const firstData = json[0];
                expect(firstData).toBeDefined();
                console.info("First data:", firstData);
            } else {
                // Log struktur response untuk debugging
                console.info("Response structure:", Object.keys(json));
            }
        }
    });
});