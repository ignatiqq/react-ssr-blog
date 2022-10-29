import { makeApi } from '@api/config';

const blogAPI = makeApi(`${process.env.API_URL}`);

export default blogAPI;