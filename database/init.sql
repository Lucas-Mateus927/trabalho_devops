CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    produto VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pendente'
);