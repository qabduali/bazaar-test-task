'use client'

import axios, { AxiosResponse } from 'axios';
import {  AdsFilterParams, IAd, PaginatedResult } from '../consts/types';
 
export const getAdsList = (filters?: AdsFilterParams): Promise<PaginatedResult<IAd>> => {
  let url = '/api/ads';

  if (filters && Object.keys(filters).length !== 0) {
    const queryParams = Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&');

    url += `?${queryParams}`;
  }

  return axios.get(url)
    .then((res: AxiosResponse<PaginatedResult<IAd>>) => res.data as PaginatedResult<IAd>);
}

export const getAdById = (id: number) => axios.get(`api/ads/${id}`).then((res) => res.data);

export default getAdsList;