require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rotasUsuarios = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

//definindo o prefixo /api
app.use('/api', rotasUsuarios)

//execultando o servidor web
app.listen(PORT, ()=>{
    console.log(`servidor backend rodando na porta ${PORT}`)
})

