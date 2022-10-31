import getConfig from 'next/config';

import { userService } from '../services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
};

async function get(url: string): Promise<any> {
    const requestOptions: object = {
        method: 'GET',
        headers: authHeader(url),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function post(url: string, body: object): Promise<any> {
    const requestOptions: object = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function put(url: string, body: object) {
    const requestOptions: object = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
    const requestOptions: object = {
        method: 'DELETE',
        headers: authHeader(url),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// helper functions

function authHeader(url: string) {
    const user = userService.userValue;
    const isLoggedIn = user && user.authdata;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    console.log('URL: ', url)
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Basic ${user.authdata}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
