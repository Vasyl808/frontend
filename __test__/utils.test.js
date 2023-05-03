import { toast } from 'react-toastify';
import error_handler from '../src/utils/utils';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('error_handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display a generic error message for network errors', () => {
    const error = new Error('{"error": ["Something went wrong."]}');
    error_handler(error);
  });

  it('should display the error message for non-network errors', () => {
    const error = new Error('Something went wrong.');
    error_handler(error);
  });

  it('should display the error message for non-Error objects', () => {
    const error = { message: 'Something went wrong.' };
    error_handler(error);
  });
});