import { useCallback } from 'react';
import type { NetPresentValueCalculationModel } from '../../models/NetPresentValueCalculationModel';
import type { NetPresentValueCalculationResultModel } from '../../models/NetPresentValueCalculationResultModel';
import { npvModelToRequestDto } from '../../mappers/npvModelToRequestDto';
import { NetPresentValueApiClient } from '../../api/clients/netPresentValueApiClient';
import { npvResponseDtoToResultModel } from '../../mappers/npvResponseDtoToResultModel';

export const useNetPresentValueCalculation = () => {
  const calculate = useCallback(
    async (model: NetPresentValueCalculationModel): Promise<NetPresentValueCalculationResultModel[]> => {
      const requestDto = npvModelToRequestDto(model);
      var apiClient = new NetPresentValueApiClient();
      const responseDto = await apiClient.calculateNetPresentValue(requestDto);
      return npvResponseDtoToResultModel(responseDto);
    },
    []
  );

  return { calculate };
};