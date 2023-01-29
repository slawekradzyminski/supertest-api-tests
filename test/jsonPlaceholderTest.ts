import { expect } from 'chai'
import * as request from 'supertest';

export const apiServer = request('https://jsonplaceholder.typicode.com')

describe('Test the JSONPlaceholder API', () => {
    it('It should return a list of posts', async () => {
        const response = await apiServer.get('/posts');
        expect(response.statusCode).to.eq(200);
        expect(response.body.length).to.be.gt(0);
    });

    it('It should return a specific post by id', async () => {
        const postId = 1;
        const response = await apiServer.get(`/posts/${postId}`);
        expect(response.statusCode).to.eq(200);
        expect(response.body.id).to.eq(postId);
    });

    it('It should return a 404 status code for a non-existing post', async () => {
        const postId = 100000;
        const response = await apiServer.get(`/posts/${postId}`);
        expect(response.statusCode).to.eq(404);
    });
});