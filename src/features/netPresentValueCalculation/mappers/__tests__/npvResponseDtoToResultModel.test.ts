import type { NetPresentValueCalculationResponseDto } from "../../api/dtos/NetPresentValueCalculationResponseDto";
import { npvResponseDtoToResultModel } from "../npvResponseDtoToResultModel";


describe('npvResponseDtoToResultModel', () => {
  it('should correctly map response DTO to result model array', () => {
    const dto: NetPresentValueCalculationResponseDto = {
      Results: [
        { DiscountRate: 0.02, NetPresentValue: 570 },
        { DiscountRate: 0.03, NetPresentValue: 550 },
        { DiscountRate: 0.04, NetPresentValue: 530 },
      ],
    };

    const result = npvResponseDtoToResultModel(dto);

    expect(result).toEqual([
      { discountRate: 0.02, netPresentValue: 570 },
      { discountRate: 0.03, netPresentValue: 550 },
      { discountRate: 0.04, netPresentValue: 530 },
    ]);
  });

  it('should handle empty result list', () => {
    const dto: NetPresentValueCalculationResponseDto = {
      Results: [],
    };

    const result = npvResponseDtoToResultModel(dto);
    expect(result).toEqual([]);
  });
});