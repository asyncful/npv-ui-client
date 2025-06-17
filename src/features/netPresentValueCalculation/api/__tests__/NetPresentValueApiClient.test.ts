import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NetPresentValueApiClient } from '../clients/NetPresentValueApiClient';

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
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiClient.calculateNetPresentValue(mockRequest);

    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith('http://localhost:7006/api/npv/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequest),
    });

    expect(result).toEqual(mockResponse);
  });

  it('throws default error when response is not ok and has no detail', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(apiClient.calculateNetPresentValue(mockRequest)).rejects.toThrow(
      'Failed to calculate net present value'
    );
  });

  it('throws custom error message from error response detail field', async () => {
    const errorDetail = 'There should be at least one cash flow.';
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        title: 'Validation error',
        status: 400,
        detail: errorDetail,
        instance: 'npv/calculate',
      }),
    });

    await expect(apiClient.calculateNetPresentValue(mockRequest)).rejects.toThrow(errorDetail);
  });

  it('throws default error if error response is not valid JSON', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    await expect(apiClient.calculateNetPresentValue(mockRequest)).rejects.toThrow(
      'Failed to calculate net present value'
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
