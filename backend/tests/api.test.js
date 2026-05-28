const request = require('supertest');
const app = require('../src/app');

describe('Testes da API de Pedidos', () => {
  it('Deve retornar status 200 e uma mensagem no endpoint principal (/)', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('Deve retornar status 200 e status UP no endpoint /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });
});