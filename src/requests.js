import axios from "axios";

export function isAuthenticated() {
    return localStorage.getItem('jwtRefresh') !== null;
}

function getAndLogAxiosErrorResponse(error) {
    if (error.response !== undefined) {
        return error.response;
    } else {
        const errorResponse = {
            "data": {},
            "status": 520
        }
        if (error.request) {
            errorResponse.data.request = error.request;
            console.log('Made request but got no response:', error.request);
        } else {
            errorResponse.data.message = error.message;
            console.log('Error', error.message);
        }

        return errorResponse;
    }
}

function requestWithJwt(config, withoutRedirect, resolve, reject, again) {
    axios(config).then(response => {
        resolve(response);
    }).catch(error => {
        if (error.response) {
            if (error.response.status === 401 && !again) {
                refreshJwt(config, error, withoutRedirect, resolve, reject);
            } else {
                reject(error.response);
            }
        } else {
            reject(getAndLogAxiosErrorResponse(error));
        }
    });
}

function refreshJwt(config, error, withoutRedirect, resolve, reject) {
    if (localStorage.getItem('refreshingJwt') !== null) {
        waitJwtRefresh(config, withoutRedirect, resolve, reject);
        return;
    }

    const refresh = localStorage.getItem('jwtRefresh');
    if (!refresh) {
        if (!withoutRedirect) {
            window.vue.$router.push({name: 'login'});
        }
        reject(error.response);
        return;
    }

    localStorage.setItem('refreshingJwt', 'true');
    axios.post('/api/v1/token/refresh/', {refresh}).then(response => {
        localStorage.setItem('jwtAccess', response.data.access);
        config['headers']['Authorization'] = `Bearer ${response.data.access}`;
        requestWithJwt(config, withoutRedirect, resolve, reject, true);
    }).catch(error => {
        window.vue.$root.$emit('clearJwt');
        if (!withoutRedirect) {
            window.vue.$router.push({name: 'login'});
        }
        reject(getAndLogAxiosErrorResponse(error));
    }).then(() => localStorage.removeItem('refreshingJwt'));
}

function waitJwtRefresh(config, withoutRedirect, resolve, reject) {
    setTimeout(() => {
        if (localStorage.getItem('refreshingJwt') === null) {
            config['headers']['Authorization'] = `Bearer ${localStorage.getItem('jwtAccess')}`;
            requestWithJwt(config, withoutRedirect, resolve, reject, true);
        } else {
            waitJwtRefresh(config, withoutRedirect, resolve, reject);
        }
    }, 30);
}

function prepareConfig(method, url, data = {}, config = {}) {
    if (!('headers' in config)) {
        config['headers'] = {};
    }

    const jwt = localStorage.getItem('jwtAccess');
    if (jwt) {
        config['headers']['Authorization'] = `Bearer ${jwt}`;
    }

    config['method'] = method;
    config['url'] = url;
    config['data'] = data;

    return config;
}

function createRequestPromise(method, url, data, config, withoutRedirect) {
    return new Promise((resolve, reject) => {
        requestWithJwt(
            prepareConfig(method, url, data, config),
            withoutRedirect, resolve, reject
        );
    });
}

export function axiosPost(url, data, config, withoutRedirect) {
    return createRequestPromise('post', url, data, config, withoutRedirect);
}

export function axiosPatch(url, data, config, withoutRedirect) {
    return createRequestPromise('patch', url, data, config, withoutRedirect);
}

export function axiosGet(url, config, withoutRedirect) {
    return createRequestPromise('get', url, undefined, config, withoutRedirect);
}
