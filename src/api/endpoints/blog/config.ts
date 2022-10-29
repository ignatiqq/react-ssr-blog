import { makeApi } from 'api/config';

export const blogAPI = makeApi(`${process.env.API_URL}`);