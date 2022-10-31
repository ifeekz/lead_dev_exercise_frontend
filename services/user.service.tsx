import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userData = (typeof window !== 'undefined') ? localStorage.getItem('user') : null;
const userSubject = new BehaviorSubject(
    JSON.parse(userData || '{}')
);

const login = async (username: string, password: string) => {
    const user = await fetchWrapper.post(`${baseUrl}/auth/login`, {
        username,
        password,
    });
    user.authdata = window.btoa(username + ':' + password);
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

const logout = () => {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

const getAll = () => {
    return fetchWrapper.get(baseUrl);
}

export const userService = {
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value;
    },
    login,
    logout,
    getAll,
};