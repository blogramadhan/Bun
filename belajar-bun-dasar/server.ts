Bun.serve({
    port: 3000,
    fetch: async (request) => {
        const url = new URL(request.url);
        if (url.searchParams.get("name")) {
            return new Response(`Hello ${url.searchParams.get("name")}`);
        } else {
            return new Response("Hello World");
        }
    }
});