'use strict';

const {db, users} = require('../src/models');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Testing Authorization system', () => {
  it('Should create a user with assigned token, roles, and capabilities', async () => {
    const newUser = await users.create({ 
      username: 'Tim',
      password: 'testing',
      role: 'user'
    });

    expect(newUser.token).toBeTruthy();
    expect(newUser.role).toBe('user');
    expect(newUser.capabilities.includes('read')).toBeTruthy();
    expect(newUser.capabilities.includes('delete')).toBeFalsy();

  });
});

