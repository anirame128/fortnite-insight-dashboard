// src/app/api/user/settings/tests/route.test.ts

import request from 'supertest';
import { app } from '../../../server'; // Adjust the import path based on your server setup
import { mockUserSettings, mockUpdateSettings } from './mocks'; // Mock data for testing

describe('User Settings API', () => {
  describe('GET /api/user/settings', () => {
    it('should return user settings successfully', async () => {
      const response = await request(app).get('/api/user/settings').set('Authorization', `Bearer ${mockUserSettings.token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        email: expect.any(String),
        notifications: expect.any(Object),
        // Add other expected properties based on your settings structure
      }));
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app).get('/api/user/settings');
      
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Unauthorized',
      });
    });
  });

  describe('POST /api/user/settings', () => {
    it('should update user settings successfully', async () => {
      const response = await request(app)
        .post('/api/user/settings')
        .set('Authorization', `Bearer ${mockUpdateSettings.token}`)
        .send({
          email: 'newemail@example.com',
          notifications: { email: true, sms: false },
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Settings updated successfully',
      });
    });

    it('should return 400 for invalid settings', async () => {
      const response = await request(app)
        .post('/api/user/settings')
        .set('Authorization', `Bearer ${mockUpdateSettings.token}`)
        .send({
          email: 'invalid-email',
          notifications: { email: true, sms: 'not-a-boolean' }, // Invalid type
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Invalid settings format',
      });
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app)
        .post('/api/user/settings')
        .send({
          email: 'newemail@example.com',
          notifications: { email: true, sms: false },
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Unauthorized',
      });
    });
  });
});