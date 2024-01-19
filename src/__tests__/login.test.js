import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import FormExample from './FormExample'; // Make sure to adjust the import path

// Mock axios.post to simulate a successful login
jest.mock('axios');

describe('FormExample', () => {
  it('renders login form correctly', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <FormExample />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(getByLabelText(/identifier/i), { target: { value: 'Sprencz Robi' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: '123456' } });

    // Trigger form submission
    fireEvent.click(getByText(/log in/i));

    // Ensure the form is validated and submission is prevented
    await waitFor(() => {
      expect(getByText(/valid/i)).toBeInTheDocument();
    });
    expect(axios.post).not.toHaveBeenCalled(); // Ensure axios.post is not called

    // You can also test other aspects like error messages and successful login scenarios
  });
});
