export interface NetPresentValueCalculationRequestDto
{
    CashFlows: number[];
    DiscountRateDetails: DiscountRateDetailsDto;
}

export interface DiscountRateDetailsDto
{
    LowerBoundDiscountRate: number;
    UpperBoundDiscountRate: number;
    Increment: number;
}

