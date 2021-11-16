'use strict';

const app = require('../src/server.js');
const { db, users } = require('../src/models');
const supertest = require('supertest');
const request = supertest(app.server);
const base64 = require('base-64');


beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

// describe('User', () => {
//   let userInfo = user.create({
//     username: 'Tray',
//     password: 'pass',
//     role: 'user',
//   });
// });

describe('Testing server router', () => {
  it('Should creat a user', async () => {
    let response = await request.post('/api/signup').send({
      username: 'Tim',
      password: 'testing',
      role: 'user'
    });

    expect(response.status).toBe(201);
  });
  
  it('Should authorize a request on POST /signin', async () => {
    let encodedString = base64.encode('Tim:testing');
    let response = await request.post('/api/signin').set({
      Authorization: `Basic ${encodedString}`
    });
    expect(response.status).toBe(200);
  })

  // it('Should attach a token on find', async() => {
  //   let newUser = await user.findOne({ where: { username: userInfo.username}});
  //   expect(newUser.username).toBe(userInfo.username);
  //   expect(newUser.token).toBeTruthy();
  //   expect(jwt.decode(newUser.token).username).toEqual(userInfo.username);
  // });
  it('Should create a post through POST /api/acl/posting', async () => {
    const newUser = await request.post('/api/signup').send({ 
      username: 'Timma',
      password: 'postTest',
      role: 'user'
    });
    const userObject = newUser.body.user;
    const token = userObject.token;
    //console.log(newUser);
    let response = await request.post('/api/acl/posting').set({
      Authorization: `Bearer ${token}`
    }).send({
      "name": "bike",
      "quantity": 1,
      "category": "tool",
      "price": 200,
      "location": "Seattle",
      "condition": "good"
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('bike');
  })

  it('Should read all posts through GET /api/readOnly/posting', async () => {
    let response = await request.get('/api/readOnly/posting');
    // console.log('###############');
    // console.log(JSON.parse(response.res.text));
    expect(response.status).toBe(200);
    expect(response).toBeTruthy();
    expect(typeof response.body).toEqual('object');
  })
});