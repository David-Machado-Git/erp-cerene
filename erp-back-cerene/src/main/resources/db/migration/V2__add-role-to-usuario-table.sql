-- Adicionando a coluna 'role' à tabela 'usuario'
ALTER TABLE usuario
ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT 'USER';
