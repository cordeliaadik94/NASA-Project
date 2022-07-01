 const request = require ('supertest');

const app = require('../../app');

describe('Test GET /launches', async () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    });

});

describe('Test POST /launch', () => {
    test('It should respond with success', () => {});
    test('It should catch missing required properties', () => {});
    test('It should catch invalid dates', () =>{});
});






