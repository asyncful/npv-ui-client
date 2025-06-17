export interface NetPresentValueCalculationModel
{
  cashFlows: number[];
  discountRate: {
    lower: number;
    upper: number;
    increment: number;
  };
}