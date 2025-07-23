const HealthService = require('../src/services/health');

describe('HealthService', () => {
  it('getStatus returns ok, correct env, and timestamp', () => {
    process.env.NODE_ENV = 'test-env';
    const status = HealthService.getStatus();
    expect(status.status).toBe('ok');
    expect(status.message).toMatch(/healthy/i);
    expect(status.environment).toBe('test-env');
    expect(typeof status.timestamp).toBe('string');
  });

  it('getStatus defaults environment if unset', () => {
    delete process.env.NODE_ENV;
    const status = HealthService.getStatus();
    expect(status.environment).toBe('development');
  });
});
