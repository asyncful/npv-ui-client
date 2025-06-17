import type { NetPresentValueCalculationModel } from "../../models/NetPresentValueCalculationModel";
import { npvModelToRequestDto } from "../npvModelToRequestDto";

describe('npvModelToRequestDto', () => {
  it('should correctly map model to request DTO', () => {
    const model: NetPresentValueCalculationModel = {
      cashFlows: [100, 200, 300],
      discountRate: {
        increment: 0.01,
        lower: 0.02,
        upper: 0.05,
      },
    };

    const dto = npvModelToRequestDto(model);

    expect(dto).toEqual({
      CashFlows: [100, 200, 300],
      DiscountRateDetails: {
        Increment: 0.01,
        LowerBoundDiscountRate: 0.02,
        UpperBoundDiscountRate: 0.05,
      },
    });
  });
});