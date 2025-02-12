const pool = require('./db');
const {pool} = require ('pg');

const pool = new pool({
    user: 'usuarioAdmin',
    host: 'localhost',
    database: 'WhatsappDB',
    password: 'AdminUser',
    port: 5432,
})

async function  salvaLog(phone, message, status, errorMessage = null) {
    try{
        await pool.query(
            'INSERT INTO whatsapp_logs (phone, message, status, errorMessage = null) VALUES ($1, $2, $3, $4)',
            [phone, message, status, errorMessage]
        );
        console.log('Log salvo: ${phone} - ${status}');

    }catch (err) {
        console.error('Erro ao salvar os logs', err);
    }   
}

async function sendMessage(phone, message) {
    
    try{
        const response = await registrarlog(phone, message);

        if (response.success){
            await salvaLog(phone, message, 'sent');
        }else{
            await salvaLog(phone, message, 'failed', response.error);
        }
    }catch(error) {
        await salvaLog(phone, message, 'failed', error.message);

    }
}