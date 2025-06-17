import type { NetPresentValueCalculationRequestDto } from "../dtos/NetPresentValueCalculationRequestDto";
import type { NetPresentValueCalculationResponseDto } from "../dtos/NetPresentValueCalculationResponseDto";

export class NetPresentValueApiClient
{
    private readonly baseUrl: string;

    constructor(baseUrl: string = ' http://localhost:7006/api/npv') {
        this.baseUrl = baseUrl;
    }

    async calculateNetPresentValue(request: NetPresentValueCalculationRequestDto): Promise<NetPresentValueCalculationResponseDto> {
        const res = await fetch(`${this.baseUrl}/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
        throw new Error('Failed to calculate net present value');
        }

        return await res.json();
    }
}