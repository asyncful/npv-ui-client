export interface NetPresentValueCalculationResponseDto
{
    Results: CalculatedNetPresentValueDto[];
}

export interface CalculatedNetPresentValueDto
{
    DiscountRate: number;
    NetPresentValue: number;
}
