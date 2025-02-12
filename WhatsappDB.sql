-- Database: WhatsappDB

-- DROP DATABASE IF EXISTS "WhatsappDB";

CREATE DATABASE "WhatsappDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE logs_whatsapp(
	id SERIAL PRIMARY KEY,
    mensagem_id VARCHAR(255) NOT NULL,
    telefone_destinatario VARCHAR(11) NOT NULL,
	mensagem_conteudo TEXT NOT NULL,
	status VARCHAR(50),
	data_envio TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	data_resposta TIMESTAMPTZ,
	erro TEXT
);
