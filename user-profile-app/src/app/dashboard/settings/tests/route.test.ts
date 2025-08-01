// src/app/dashboard/settings/tests/route.test.ts

import request from 'supertest';
import { app } from '../../../server'; // Adjust the import based on your server setup
import { createUser, deleteUser } from '../../../utils/testHelpers'; // Import test helpers if needed

describe('Settings API Endpoint Integration Tests', () => {
  let userToken: string;
  let userId: string;

  beforeAll(async () => {
    const user = await createUser(); // Create a test user
    userId = user.id;
    userToken = user.token; // Assume the token is returned upon user creation
  });

  afterAll(async () => {
    await deleteUser(userId); // Clean up test user
  });

  it('should update user profile successfully', async () => {
    const response = await request(app)
      .put(`/api/settings/profile`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Updated Name',
        email: 'updated@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    expect(response.body.data).toHaveProperty('name', 'Updated Name');
    expect(response.body.data).toHaveProperty('email', 'updated@example.com');
  });

  it('should return 401 for unauthorized access', async () => {
    const response = await request(app)
      .put(`/api/settings/profile`)
      .send({
        name: 'Unauthorized Update',
        email: 'unauthorized@example.com',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Unauthorized');
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app)
      .put(`/api/settings/profile`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: '', // Invalid name
        email: 'invalid-email', // Invalid email
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid input');
  });

  it('should handle server errors gracefully', async () => {
    // Simulate a server error by mocking the database or service layer
    jest.spyOn(SomeService, 'updateProfile').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .put(`/api/settings/profile`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Error Test',
        email: 'error@example.com',
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});