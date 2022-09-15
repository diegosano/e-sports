import express from 'express'

const app = express()

app.get('/ads', (request, response) => {
  return response.json([{teste: 'acessou ads'}])
})

app.listen(3333, () => {
  console.log('server started on port 3333')
})