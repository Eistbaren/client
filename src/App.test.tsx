import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Header exists', () => {
  render(<App />);
  const linkElement = screen.getByText(/Reservation bear/i);
  expect(linkElement).toBeInTheDocument();
});
