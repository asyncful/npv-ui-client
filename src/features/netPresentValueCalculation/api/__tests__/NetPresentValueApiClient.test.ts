import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NetPresentValueApiClient } from '../clients/NetPresentValueApiClient';

// Mocked DTOs
const mockRequest = {
  CashFlows: [100, 200, 300],
  DiscountRateDetails: {
    LowerBoundDiscountRate: 0.01,
    UpperBoundDiscountRate: 0.05,
    Increment: 0.01,
  },
};

const mockResponse = {
  Results: [
    { DiscountRate: 0.01, NetPresentValue: 580 },
    { DiscountRate: 0.02, NetPresentValue: 570 },
  ],
};

describe('NetPresentValueApiClient tests', () => {
  const apiClient = new NetPresentValueApiClient('http://localhost:7006/api/npv');

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends a POST request and returns parsed response on success', async () => {
    // Arrange
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Act
    const result = await apiClient.calculateNetPresentValue(mockRequest);

    // Assert
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith('http://localhost:7006/api/npv/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequest),
    });

    expect(result).toEqual(mockResponse);
  });

  it('throws an error if response is not ok', async () => {
    // Arrange
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    // Act & Assert
    await expect(apiClient.calculateNetPresentValue(mockRequest)).rejects.toThrow(
      'Failed to calculate net present value'
    );
  });
});
