
-- Criando a tabela Empresa
CREATE TABLE empresa (
    id BIGSERIAL PRIMARY KEY,         -- Usando BIGSERIAL para auto incremento no PostgreSQL
    nome VARCHAR(255) NOT NULL,        -- Nome da empresa
    empresa VARCHAR(255) NOT NULL      -- Nome comercial ou identificador da empresa
);

-- Criando a tabela Usuario
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,         -- Usando BIGSERIAL para auto incremento no PostgreSQL
    login VARCHAR(255) NOT NULL UNIQUE, -- Login único
    password VARCHAR(255) NOT NULL,    -- Senha do usuário
    empresa_id BIGINT NOT NULL,        -- Chave estrangeira para empresa
    FOREIGN KEY (empresa_id) REFERENCES empresa(id) -- Definindo a chave estrangeira
);