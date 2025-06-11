import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()
const book = new Hono().basePath('/api')

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  c.status(500);
  return c.json({
    "message": "Internal Server Error",
    "error": err.message
  })
})

app.get('/', (c) => {
  return c.text('Hello Kurnia Ramadhan!')
})

app.get('/hello/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`Hello ${name}`)
})

app.get('/products/:id{[0-9]+}', async (c) => {
  const id = c.req.param('id')
  return c.text(`Product ID: ${id}`)
})

app.get('/say-hello', (c) => {
  const name = c.req.query('name')
  if (!name) {
    throw new HTTPException(400, {
      res: new Response(
        JSON.stringify({
          "message": "Name is required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Author": "Kurnia Ramadhan"
          }
        }
      )
    })
  }

  return c.text(`Hello ${name}`)
})

// Book
book.get('/book', (c) => {
  return c.text('Book')
})

book.get('/book/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`Book ID: ${id}`)
})

app.route('/', book)

app.get('/context', async (c) => {
  c.header('X-Powered-By', 'Hono');
  c.status(200);

  return c.body(JSON.stringify({
    "first_name": "Kurnia",
    "last_name": "Ramadhan",
    "age": 20,
    "address": "Jl. Raya No. 123"
  }))
})

app.get('/context.json', async (c) => {
  return c.json({
    "first_name": "Kurnia",
    "last_name": "Ramadhan", 
    "age": 20,
    "address": "Jl. Raya No. 123"
  })
})

app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({
    "message": "User created",
    "name": `Hello ${body.name}`
  })
})

app.get('/users', async (c) => {
  const page = c.req.query('page')
  const size = c.req.query('size')

  return c.json({
    "page": page,
    "size": size
  })
})

app.get('/response/text', async (c) => {
  return c.text('Hello Hono')
})

app.get('/response/json', async (c) => {
  return c.json({
    "message": "Hello Hono"
  })
})

app.get('/response/html', async (c) => {
  return c.html('<h1>Hello Hono</h1>')
})

export default app