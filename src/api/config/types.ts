import { AxiosResponse } from 'axios';

export enum requestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type IRequestConfig = Partial<{
  cache: string;
  mode: string;
  credentials: string;
  redirect: string;
  referrerPolicy: string;
  headers: Record<string, string>;
}>;

export interface IRequestArgs<T> extends IRequestConfig {
  url: string;
  method: requestMethods;
  body?: T;
}

export type Response<T> = AxiosResponse<T>;