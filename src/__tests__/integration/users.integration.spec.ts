import request from 'supertest';
import app from '../../express/App';
import sequelize from '../../infrastructure/database/config';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Users API Integration Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', email: 'testuser@example.com', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ email: 'testuser@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should get user by id', async () => {
    const response = await request(app)
      .get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('testuser');
  });

  it('should update user details', async () => {
    const response = await request(app)
      .put('/users/1')
      .send({ username: 'updateduser' });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updateduser');
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .delete('/users/1');

    expect(response.status).toBe(204);
  });
});