const HealthController = require('../src/controllers/health');
const healthService = require('../src/services/health');

jest.mock('../src/services/health');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  res.send   = jest.fn().mockReturnValue(res);
  return res;
}

describe('HealthController', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls healthService.getStatus() and returns 200 with status', () => {
    const fakeStatus = { status: 'ok', timestamp: '2024-02-01T00:00:00.000Z' };
    healthService.getStatus.mockReturnValue(fakeStatus);

    const req = {};
    const res = mockRes();

    HealthController.check(req, res);

    expect(healthService.getStatus).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeStatus);
  });
});
