import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

beforeEach(() => {
  // Default mock: return empty array
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  test('renders TODO App heading', async () => {
    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    const headingElement = await screen.findByText(/TODO App/i);
    expect(headingElement).toBeInTheDocument();
  });

  describe('Delete Functionality', () => {
    test('should call DELETE API when delete button is clicked', async () => {
      const testQueryClient = createTestQueryClient();
      const mockTodos = [
        { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
      ];

      // Mock initial fetch to return todos
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos,
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Wait for todo to appear
      await screen.findByText('Test Todo');

      // Mock DELETE request and refetch
      global.fetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // DELETE response
        .mockResolvedValueOnce({ ok: true, json: async () => [] }); // Refetch after delete

      // Click delete button
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);

      // Verify DELETE was called
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/todos/1'),
          expect.objectContaining({ method: 'DELETE' })
        );
      });
    });
  });

  describe('Stats Calculation', () => {
    test('should display correct count of incomplete items', async () => {
      const testQueryClient = createTestQueryClient();
      const mockTodos = [
        { id: 1, title: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, title: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
        { id: 3, title: 'Todo 3', completed: false, createdAt: new Date().toISOString() },
      ];

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockTodos,
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Should show 2 incomplete items
      await screen.findByText(/2 items left/i);
    });

    test('should display correct count of completed items', async () => {
      const testQueryClient = createTestQueryClient();
      const mockTodos = [
        { id: 1, title: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, title: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
        { id: 3, title: 'Todo 3', completed: true, createdAt: new Date().toISOString() },
      ];

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockTodos,
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Should show 2 completed items
      await screen.findByText(/2 completed/i);
    });
  });

  describe('Empty State', () => {
    test('should display empty state message when no todos exist', async () => {
      const testQueryClient = createTestQueryClient();

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Should show empty state message
      await screen.findByText(/no todos yet/i);
    });

    test('should not display empty state when todos exist', async () => {
      const testQueryClient = createTestQueryClient();
      const mockTodos = [
        { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
      ];

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockTodos,
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Wait for todo to appear
      await screen.findByText('Test Todo');

      // Should NOT show empty state message
      expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('should display error message when fetch fails', async () => {
      const testQueryClient = createTestQueryClient();

      // Mock fetch to fail
      global.fetch.mockRejectedValue(new Error('Network error'));

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Should show error message
      await screen.findByText(/error loading todos/i);
    });

    test('should display error message when API returns error status', async () => {
      const testQueryClient = createTestQueryClient();

      // Mock fetch to return error status
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      // Should show error message
      await screen.findByText(/error loading todos/i);
    });
  });

  describe('API URL', () => {
    test('should use relative URL instead of hardcoded localhost', async () => {
      const testQueryClient = createTestQueryClient();

      render(
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/todos');
      });
    });
  });
});
