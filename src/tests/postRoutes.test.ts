import request from 'supertest';
import { expect } from 'chai';
import app from '../app'; // Assumindo que o app está exportado em app.ts

describe('Posts API', () => {
    it('should fetch all posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // Adicione outros testes para cada endpoint: getPost, addPost, editPost, removePost, e search
});