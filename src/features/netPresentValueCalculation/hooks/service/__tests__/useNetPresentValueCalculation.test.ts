import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNetPresentValueCalculation } from '../useNetPresentValueCalculation'; // adjust path
import { NetPresentValueApiClient } from '../../../api/clients/NetPresentValueApiClient';
import * as requestMapper from '../../../mappers/npvModelToRequestDto';
import * as responseMapper from '../../../mappers/npvResponseDtoToResultModel';

const mockModel = {
  cashFlows: [100, 200],
  discountRate: { lower: 0.01, upper: 0.03, increment: 0.01 },
};

const mockRequestDto = {
  CashFlows: [100, 200],
  DiscountRateDetails: {
    LowerBoundDiscountRate: 0.01,
    UpperBoundDiscountRate: 0.03,
    Increment: 0.01,
  },
};

const mockResponseDto = { 
  Results: [
    { DiscountRate: 0.01, NetPresentValue: 290 },
    { DiscountRate: 0.02, NetPresentValue: 285 },
  ],
};

const mockResultModel = [
  { discountRate: 0.01, netPresentValue: 290 },
  { discountRate: 0.02, netPresentValue: 285 },
];

describe('useNetPresentValueCalculation', () => {
  beforeEach(() => {
    vi.spyOn(requestMapper, 'npvModelToRequestDto').mockReturnValue(mockRequestDto);
    vi.spyOn(responseMapper, 'npvResponseDtoToResultModel').mockReturnValue(mockResultModel);

    vi.spyOn(NetPresentValueApiClient.prototype, 'calculateNetPresentValue')
      .mockResolvedValue(mockResponseDto);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates NPV using API client and maps result', async () => {
    const { result } = renderHook(() => useNetPresentValueCalculation());

    let output;
    await act(async () => {
      output = await result.current.calculate(mockModel);
    });

    expect(requestMapper.npvModelToRequestDto).toHaveBeenCalledWith(mockModel);
    expect(NetPresentValueApiClient.prototype.calculateNetPresentValue).toHaveBeenCalledWith(mockRequestDto);
    expect(responseMapper.npvResponseDtoToResultModel).toHaveBeenCalledWith(mockResponseDto);
    expect(output).toEqual(mockResultModel);
  });
});
