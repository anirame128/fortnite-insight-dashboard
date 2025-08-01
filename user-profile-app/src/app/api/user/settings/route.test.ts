// src/app/api/user/settings/route.test.ts

import { NextRequest, NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';
import handler from './route'; // Adjust the import based on your actual API handler path

describe('User Settings API', () => {
  it('should update user profile settings successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: 'newUsername',
        email: 'newEmail@example.com',
      },
    });

    await handler(req as NextRequest, res as NextResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      message: 'Profile updated successfully',
    });
  });

  it('should return an error for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: '', // Invalid username
        email: 'invalidEmail', // Invalid email
      },
    });

    await handler(req as NextRequest, res as NextResponse);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toEqual({
      error: 'Invalid input',
    });
  });

  it('should handle server errors gracefully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: 'validUsername',
        email: 'validEmail@example.com',
      },
    });

    // Simulate a server error by mocking the database or service call
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('Server error');
    });

    await handler(req as NextRequest, res as NextResponse);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual({
      error: 'Internal server error',
    });

    // Restore the original implementation
    global.fetch.mockRestore();
  });
});