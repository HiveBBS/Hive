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
  let user1Token = 0;
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
    user1Token = token;
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('bike');
  })

  it('Should read all posts through GET /api/readOnly/posting', async () => {
    let response = await request.get('/api/readOnly/posting');
   
    console.log(response.res.text);
    expect(response.status).toBe(200);
    expect(response).toBeTruthy();
    expect(typeof response.body).toEqual('object');
  })

  it('Should not allow anyone besides the creator of the post to update', async () => {
    const user2 = await request.post('/api/signup').send({ 
      username: 'Tim2',
      password: 'test',
      role: 'user'
    });
    const userObject = user2.body.user;
    const token = userObject.token;
  
    let response = await request.put('/api/acl/posting/1').set({
      Authorization: `Bearer ${token}`
    }).send({
      "name": "toy bike"
    });

    expect(response.error).toBeTruthy();
  })

  it('Should allow only  the creator of the post to update', async () => {
    
    const token = user1Token;
  
    let response = await request.put('/api/acl/posting/1').set({
      Authorization: `Bearer ${token}`
    }).send({
      "name": "toy bike"
    });
    let updated = await request.get('/api/readOnly/posting');
   
    console.log(updated.res.text);

    expect(response.status).toBe(200);
  })

  it('Should not allow anyone besides the creator of the post to delete', async () => {
    const user3 = await request.post('/api/signup').send({ 
      username: 'Tim3',
      password: 'test',
      role: 'user'
    });
    const userObject = user3.body.user;
    const token = userObject.token;
    let response = await request.delete('/api/acl/posting/1').set({
      Authorization: `Bearer ${token}`
    });

    expect(response.error).toBeTruthy();
  })

  // it('Should allow the poster to only delete their own posts', async () => {
		
  //   const token = user1Token;

	// 	let response = await request.delete('./api/acl/posting/1').set({
	// 		Authorization: `Bearer ${token}`
	// 	});
	// 	expect(response.status).toBe(200);
  
	// })


});