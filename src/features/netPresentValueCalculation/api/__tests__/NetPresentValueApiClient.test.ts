// import { NetPresentValueApiClient } from "../clients/netPresentValueApiClient";
// import type { NetPresentValueCalculationRequestDto } from "../dtos/NetPresentValueCalculationRequestDto";
// import type { NetPresentValueCalculationResponseDto } from "../dtos/NetPresentValueCalculationResponseDto";

// global.fetch = jest.fn(); // mock global fetch

// describe('NetPresentValueApiClient', () => {
//   const client = new NetPresentValueApiClient('http://test-api.com/api/npv');

//   const mockRequest: NetPresentValueCalculationRequestDto = {
//     CashFlows: [100, 200, 300],
//     DiscountRateDetails: {
//       LowerBoundDiscountRate: 0.01,
//       UpperBoundDiscountRate: 0.05,
//       Increment: 0.01,
//     },
//   };

//   const mockResponse: NetPresentValueCalculationResponseDto = {
//     Results: [
//       { DiscountRate: 0.01, NetPresentValue: 567 },
//       { DiscountRate: 0.02, NetPresentValue: 543 },
//     ],
//   };

//   beforeEach(() => {
//     (fetch as jest.Mock).mockClear();
//   });

//   it('calls the correct URL with proper payload and returns parsed result', async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockResponse,
//     });

//     const result = await client.calculateNetPresentValue(mockRequest);

//     expect(fetch).toHaveBeenCalledWith('http://test-api.com/api/npv/calculate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(mockRequest),
//     });

//     expect(result).toEqual(mockResponse);
//   });

//   it('throws an error when API response is not ok', async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: false,
//       status: 500,
//       statusText: 'Internal Server Error',
//     });

//     await expect(client.calculateNetPresentValue(mockRequest)).rejects.toThrow(
//       'Failed to calculate net present value'
//     );
//   });
// });