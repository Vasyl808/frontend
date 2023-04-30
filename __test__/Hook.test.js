import { useHttp } from '../src/hook/http.hook';

describe('useHttp', () => {
  it('returns a request function', async () => {
    const { request } = useHttp();

    const mockData = { Medicine: ['med1', 'med2', 'med3'] };
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => mockData,
    });
    global.fetch = mockFetch;

    const url = 'https://example.com/api/medicine';
    const data = await request(url);

    expect(mockFetch).toHaveBeenCalledWith(url, { method: 'GET', body: null, headers: { 'Content-Type': 'application/json' } });
    expect(data).toEqual(mockData.Medicine);
  });
});
