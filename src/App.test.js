import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('render App component', () => {
    render(<App />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  test('get properties list', async () => {
    render(<App />);
    expect(await screen.findAllByText('Price')).toHaveLength(4);
  });

  test('add to saved list', async () => {
    render(<App />);
    expect(await screen.findAllByText('Price')).toHaveLength(4);
    userEvent.click(screen.getAllByRole('btn')[0]);
    expect(screen.getAllByText('Price')).toHaveLength(5);
    expect(screen.getAllByText('Remove Property')).toHaveLength(2);
  });

  test('property only add to saved list once', async () => {
    render(<App />);
    expect(await screen.findAllByText('Price')).toHaveLength(4);
    userEvent.click(screen.getAllByRole('btn')[0]);
    userEvent.click(screen.getAllByRole('btn')[0]);
    expect(screen.getAllByText('Price')).toHaveLength(5);
    expect(screen.getAllByText('Remove Property')).toHaveLength(2);
  });

  test('remove from saved', async () => {
    render(<App />);
    expect(await screen.findAllByText('Price')).toHaveLength(4);
    userEvent.click(screen.getAllByRole('btn')[0]);
    userEvent.click(screen.getAllByText('Remove Property')[0]);
    expect(screen.getAllByText('Price')).toHaveLength(4);
    expect(screen.getAllByText('Remove Property')).toHaveLength(1);
  });
});