const resquest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
   await connection.migrate.rollback();
   await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const res = await resquest(app)
      .post('/ongs')
      .send({
        name: "APA3",
        email: "contato@contato.com",
        whatsapp: "65999657475",
        city: "Cuiaba",
        uf: "MT",
      }
    );
    
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });

});