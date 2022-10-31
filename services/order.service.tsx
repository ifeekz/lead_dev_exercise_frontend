import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/v1/order_items`;

const getAll = (limit = 1, offset = 0, sort = "shipping_limit_date") => {
    return fetchWrapper.get(`${baseUrl}?limit=${limit}&offset=${offset}&sort=${sort}`);
}

const getById = (id: any) => {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

const create = (params: object) =>  {
    return fetchWrapper.post(baseUrl, params);
}

const update = (id: any, params: object) => {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = (id: string) => {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

export const orderService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
