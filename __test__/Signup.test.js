import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Signup from '../src/pages/Signup';
import React from 'react';
import '@testing-library/jest-dom';

describe('Signup Component', () => {
  it('renders Signup component', () => {
    render(<Signup />);
  });

  it('fills out form and submits successfully', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByTestId('first_name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByTestId('last_name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByTestId('age'), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByTestId('phone_number'), {
      target: { value: '123-4567-8901' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('confirm_password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByTestId('signup_btn'));
  });

  it('shows error message when passwords do not match', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByTestId('first_name'), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByTestId('last_name'), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByTestId('username'), {
        target: { value: 'johndoe' },
      });
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'johndoe@example.com' },
      });
      fireEvent.change(screen.getByTestId('age'), {
        target: { value: '30' },
      });
      fireEvent.change(screen.getByTestId('phone_number'), {
        target: { value: '123-4567-8901' },
      });
      fireEvent.change(screen.getByTestId('password'), {
        target: { value: 'password' },
      });
      fireEvent.change(screen.getByTestId('confirm_password'), {
        target: { value: 'passwo1111rd' },
      });
      fireEvent.click(screen.getByTestId('signup_btn'));
  });
});
