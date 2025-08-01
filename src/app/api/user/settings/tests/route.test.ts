// src/app/api/user/settings/tests/route.test.ts

import request from 'supertest';
import { app } from '../../../../../server'; // Adjust the import path based on your server setup
import { createUser, deleteUser } from '../../../../../tests/utils'; // Utility functions for test setup

describe('User Settings API', () => {
  let user;

  beforeAll(async () => {
    user = await createUser(); // Create a test user
  });

  afterAll(async () => {
    await deleteUser(user.id); // Clean up test user
  });

  it('should return user settings for authenticated user', async () => {
    const response = await request(app)
      .get('/api/user/settings')
      .set('Authorization', `Bearer ${user.token}`); // Assuming token-based auth

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('settings');
    expect(response.body.settings).toEqual(expect.objectContaining({
      // Add expected settings structure
      theme: expect.any(String),
      notifications: expect.any(Boolean),
    }));
  });

  it('should update user settings for authenticated user', async () => {
    const newSettings = {
      theme: 'dark',
      notifications: true,
    };

    const response = await request(app)
      .put('/api/user/settings')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newSettings);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Settings updated successfully');
    expect(response.body.settings).toEqual(expect.objectContaining(newSettings));
  });

  it('should return 401 for unauthenticated requests', async () => {
    const response = await request(app)
      .get('/api/user/settings');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Unauthorized');
  });

  it('should return 400 for invalid settings update', async () => {
    const invalidSettings = {
      theme: '', // Invalid theme
      notifications: 'yes', // Invalid type
    };

    const response = await request(app)
      .put('/api/user/settings')
      .set('Authorization', `Bearer ${user.token}`)
      .send(invalidSettings);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid settings');
  });
});