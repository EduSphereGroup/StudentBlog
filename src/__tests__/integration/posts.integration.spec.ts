import request from 'supertest';
import app from '../../express/App';
import sequelize from '../../infrastructure/database/config';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Posts API Integration Tests', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({ title: 'Test Title', content: 'Test Content', author: 'Test Author' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Title');
  });

  it('should list all posts', async () => {
    const response = await request(app)
      .get('/posts');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing post', async () => {
    const response = await request(app)
      .put('/posts/1')
      .send({ title: 'Updated Title', content: 'Updated Content' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  it('should delete a post', async () => {
    const response = await request(app)
      .delete('/posts/1');

    expect(response.status).toBe(204);
  });
});