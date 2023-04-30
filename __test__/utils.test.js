import { toast } from 'react-toastify';
import error_handler from '../src/utils/utils';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('error_handler function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display a generic error message for network errors', () => {
    const error = new Error('Network Error');
    error_handler(error);
  });

  it('should display an error message with field names and values', () => {
    const error = new Error(
      JSON.stringify({ field1: ['error message 1'], field2: ['error message 2'] })
    );
    error_handler(error);
  });

});
