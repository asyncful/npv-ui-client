import type { NetPresentValueCalculationResponseDto } from "../api/dtos/NetPresentValueCalculationResponseDto";
import type { NetPresentValueCalculationResultModel } from "../models/NetPresentValueCalculationResultModel";

export const npvResponseDtoToResultModel = (dto: NetPresentValueCalculationResponseDto): NetPresentValueCalculationResultModel[] => 
{
    return dto.Results.map((x) => ({
        discountRate: x.DiscountRate,
        netPresentValue: x.NetPresentValue,
    }))
}



