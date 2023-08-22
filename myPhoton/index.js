require('dotenv').config()
const express = require('express')

const axios = require('axios')
const cors = require('cors')
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = new socketIO(server)



io.set('origins', '*:*')
app.use(cors())
app.use(express.json())



const options = {
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
    }
}


app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('/transactions', async (req, res) => {
    const url = `${process.env.BASE}/transactions`
    const { data } = await axios.get(url, options)
    res.send(data)
})


app.post('/webhooks', (req,res) => {
    console.log(req.body)
    io.emit('webhook', req.body)
    res.send('thanks webhook')
})

server.listen(port, () => console.log(`listening on port ${port}`))