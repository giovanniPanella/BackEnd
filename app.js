const express = require('express')

const db = require ("./db/models")
const cors = require ('cors');

const app = express();
app.use(express.json())
const pedidos = require ('./controllers/pedidos')
app.use(cors());
app.use('/', pedidos)




app.listen(8081,()=>{
        console.log("Servidor iniciado em http://localhost:8081")
    })
