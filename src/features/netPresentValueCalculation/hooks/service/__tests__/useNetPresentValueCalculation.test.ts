import { renderHook, act } from '@testing-library/react';
import { npvModelToRequestDto } from '../../../mappers/npvModelToRequestDto';
import { npvResponseDtoToResultModel } from '../../../mappers/npvResponseDtoToResultModel';
import { NetPresentValueApiClient } from '../../../api/clients/netPresentValueApiClient';
import { useNetPresentValueCalculation } from '../useNetPresentValueCalculation';

jest.mock('../../../mappers/npvModelToRequestDto');
jest.mock('../../../mappers/npvResponseDtoToResultModel');
jest.mock('../../../api/clients/NetPresentValueApiClient');

describe('useNetPresentValueCalculation', () => {
  const mockInputModel = {
    cashFlows: [100, 200, 300],
    discountRateRange: { lower: 0.01, upper: 0.05, increment: 0.01 },
  };

  const mockRequestDto = {
    cashFlows: [100, 200, 300],
    lowerBoundDiscountRate: 0.01,
    upperBoundDiscountRate: 0.05,
    increment: 0.01,
  };

  const mockResponseDto = { npvValues: [250, 220, 190] };

  const mockResultModel = [{ rate: 0.01, npv: 250 }];

  beforeEach(() => {
    // Reset mock state
    jest.clearAllMocks();

    // Setup mocked implementations
    (npvModelToRequestDto as jest.Mock).mockReturnValue(mockRequestDto);
    (npvResponseDtoToResultModel as jest.Mock).mockReturnValue(mockResultModel);

    (NetPresentValueApiClient as jest.Mock).mockImplementation(() => ({
      calculateNetPresentValue: jest.fn().mockResolvedValue(mockResponseDto),
    }));
  });

  it('should correctly calculate NPVs using model and mappers', async () => {
    const { result } = renderHook(() => useNetPresentValueCalculation());

    let output;
    await act(async () => {
      output = await result.current.calculate(mockInputModel);
    });

    expect(npvModelToRequestDto).toHaveBeenCalledWith(mockInputModel);

    const apiInstance = (NetPresentValueApiClient as jest.Mock).mock.instances[0];
    expect(apiInstance.calculateNetPresentValue).toHaveBeenCalledWith(mockRequestDto);

    expect(npvResponseDtoToResultModel).toHaveBeenCalledWith(mockResponseDto);
    expect(output).toEqual(mockResultModel);
  });
});
