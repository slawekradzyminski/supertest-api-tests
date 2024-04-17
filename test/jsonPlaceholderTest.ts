import { expect } from 'chai'
import * as request from 'supertest';

export const apiServer = request('https://jsonplaceholder.typicode.com')

describe('Test the JSONPlaceholder API', () => {
    it('It should return a list of posts', async () => {
        const response = await apiServer.get('/posts');
        expect(response.statusCode).to.eq(200);
        expect(response.body.length).to.be.gt(0);
    });

    it('It should return a list of comments', async () => {
        const response = await apiServer.get('/comments');
        expect(response.statusCode).to.eq(200);
        expect(response.body.length).to.be.gt(0);
        expect(response.body.length).to.eq(500);
        response.body.forEach((item: any, index: number) => {
            expect(item.id).to.eq(index + 1);
        });
    });

    it('It should return a list of posts', async () => {
        const response = await apiServer.get('/todos');
        expect(response.statusCode).to.eq(200);
        expect(response.body.length).to.eq(200);
        response.body.forEach((item: any, index: number) => {
            expect(item.id).to.eq(index + 1);
            expect(item.completed).to.be.a("boolean")
            expect(item.title).to.be.a("string")
            expect(item.userId).to.be.a("number")
        });
    });

    it('It should create a resource and return the created object with id 101', async () => {
        const postData = {
            title: 'foo',
            body: 'bar',
            userId: 1,
        };
        const response = await apiServer.post('/posts')
            .send(postData)
            .set('Content-type', 'application/json; charset=UTF-8');
        expect(response.statusCode).to.eq(201);
        expect(response.body.id).to.eq(101);
        expect(response.body.title).to.eq(postData.title);
        expect(response.body.body).to.eq(postData.body);
        expect(response.body.userId).to.eq(postData.userId);
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