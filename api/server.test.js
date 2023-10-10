// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');


beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async () => {
  await db('users').truncate();
})

afterAll(async () => {
  await db.destroy();
})

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  })
})

describe('[GET] /api/jokes', () => {
  it('should not return without a token', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => expect(res.status).toBe(401))

  })
})

describe('[POST] /api/auth/register', () => {
  it('returns proper status code when no username or password', () => {
    return request(server)
      .post('/api/auth/register')
      .then(res => expect(res.status).toBe(422))
  })

  it('returns proper status code on valid credentials', () => {
    return request(server)
      .post('/api/auth/register')
      .send({username: 'jerry', password: 'password'})
      .then(res => {
        expect(res.status).toBe(201)
      })
  })
})