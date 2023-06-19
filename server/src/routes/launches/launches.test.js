const request = require('supertest')
const app = require('../../app')
const {
    mongoConnect,
    disconnectMongoose,
} = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    })
    afterAll(async () => {
        await disconnectMongoose();
    })

    describe('Test GET /launches',  () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect(200);
        });
    });
    
    describe('Test POST /launch', () => {
        const launchDatawithDate = {
            mission: 'SMT Tech',
            rocket: 'NCC 1701-D',
            target: 'kepler-245 f',
            launchDate: 'December 25, 2030'
        }
    
        const launchDatawithoutDate = {
            mission: 'SMT Tech',
            rocket: 'NCC 1701-D',
            target: 'kepler-245 f',
        }
    
        const launchDatawithInvalidDate = {
            mission: 'SMT Tech',
            rocket: 'NCC 1701-D',
            target: 'kepler-245 f',
            launchDate: 'zoot'
        }
        test('it should respond with 201 created', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDatawithDate)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201);
        });
        test('It should respond with 400 Bad request', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDatawithoutDate)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400);
            expect(response.body).toStrictEqual({
                error: 'Please check you have all datas supplied!',
            });
        });
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDatawithInvalidDate)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400);
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date supplied',
        });
    })
});
});

