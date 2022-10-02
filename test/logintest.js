import request from 'supertest';
let { expect } = require('chai')

const apiServer = request('http://localhost:4001')

describe('POST /users', () => {

    it('responds with json', (done) => {
        apiServer
            .post('/users/signin')
            .send({
                username: 'admin',
                password: 'admin'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body.firstName).to.be.equal('Slawomir');
                return done();
            });
    });

});