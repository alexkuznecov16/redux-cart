import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Countries from './Countries';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { GET_COUNTRIES } from '../../app/query';

const mocks = [
  {
    request: {
      query: GET_COUNTRIES
    },
    result: {
      data: {
        countries: [
          { code: 'LV', name: 'Latvia', emoji: '🇱🇻' },
          { code: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
        ]
      }
    }
  }
]

describe('Countries block', () => {
  it('renders loading state', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Countries />
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  })

  it('renders countries when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Latvia/)).toBeInTheDocument();
      expect(screen.getByText(/United Kingdom/)).toBeInTheDocument();
    })
  });

  it('renders error state on GraphQL error', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_COUNTRIES,
        },
        error: new Error('Something went wrong'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Countries />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Something went wrong/)).toBeInTheDocument();
    });
  });
})