import type { NetPresentValueCalculationRequestDto } from "../dtos/NetPresentValueCalculationRequestDto";
import type { NetPresentValueCalculationResponseDto } from "../dtos/NetPresentValueCalculationResponseDto";

export class NetPresentValueApiClient
{
    private readonly baseUrl: string;

    constructor(baseUrl: string = import.meta.env.VITE_NPV_API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async calculateNetPresentValue(request: NetPresentValueCalculationRequestDto): Promise<NetPresentValueCalculationResponseDto> {
        const res = await fetch(`${this.baseUrl}/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            let errorMessage = 'Failed to calculate net present value';

            try {
                const errorBody = await res.json();
                if (errorBody.detail) {
                    errorMessage = errorBody.detail;
                }
            } catch (e) {
                console.error(e);
            }

            throw new Error(errorMessage);
        }

        return await res.json();
    }
}