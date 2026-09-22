import request from 'supertest';
import app from '../app';

describe('metrics', () => {
  it('exposes prometheus metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/plain');
    expect(res.text).toContain('http_request_duration_seconds');
  });
});
