import { Hono } from 'hono'

const app = new Hono()
const book = new Hono()

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

// Book
book.get('/book', (c) => {
  return c.text('Book')
})

book.get('/book/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`Book ID: ${id}`)
})

app.route('/', book)




export default app