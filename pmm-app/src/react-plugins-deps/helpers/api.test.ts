import { apiRequestQAN } from './api';
import axios from 'axios';
jest.mock('axios');
jest.mock('./notification-manager', () => () => ({}));

describe('GET tests', () => {
  it('should return data', async () => {
    axios.get.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.get('/test/path', { params: { key: 'value' } });
    await expect(result).toEqual('some data');
  });
});

describe('POST tests', () => {
  it('should return data', async () => {
    axios.post.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.post('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('PATCH tests', () => {
  it('should return data', async () => {
    axios.patch.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.patch('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('DELETE tests', () => {
  it('should return data', async () => {
    axios.delete.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.delete('/test/path');
    await expect(result).toEqual('some data');
  });
});