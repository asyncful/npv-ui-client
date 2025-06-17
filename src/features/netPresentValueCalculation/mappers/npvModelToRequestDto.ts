import type { NetPresentValueCalculationRequestDto } from "../api/dtos/NetPresentValueCalculationRequestDto";
import type { NetPresentValueCalculationModel } from "../models/NetPresentValueCalculationModel";

export function npvModelToRequestDto(model: NetPresentValueCalculationModel): NetPresentValueCalculationRequestDto
{
    return {
        CashFlows: model.cashFlows,
        DiscountRateDetails: {
            Increment: model.discountRate.increment,
            LowerBoundDiscountRate: model.discountRate.lower,
            UpperBoundDiscountRate: model.discountRate.upper
        }
    }
}