import express from 'express'
const express = require("express");
const venom = require('venom-bot');
const {Client} = require('pg');
const axios = require('axios');
const app = express ();
app.use(express.json());
const port = 3000

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'whatsapp_messages';
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send';


const client = new Client({
    user: 'usuarioAdmin',
    host: 'localhost',
    database: 'WhatsappDB',
    password: 'AdminUser',
    port: 5432,
  });

  client.connect();

  // Função para registrar o log no banco de dados
async function registrarLog(mensagem_id, telefone_destinatario, mensagem_conteudo, status, erro = null) {
    try {
      const query = `
        INSERT INTO logs_whatsapp (mensagem_id, telefone_destinatario, mensagem_conteudo, status, erro)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [mensagem_id, telefone_destinatario, mensagem_conteudo, status, erro];
      
      await client.query(query, values);
    } catch (err) {
      console.error("Erro ao registrar log no banco de dados:", err);
    }
  }
  
  
  
//------------------------------------------------------------------------------

venom.create({
        session: 'apiwhatsapp'  
    })
    .then((client) => start(client))
    .catch((err) =>{
        console.log(err);

    });

    const start = (client)=>{
        app.post("/send-message", async (req, res) => {
            const {to, message} = req.body;
            await client.sendText(to +"@c.us", message);
            res.json("mensagem enviada");
        })
    }

    app.listen(port, ()=>{
        console.log("API rodando na porta " +port);
    })