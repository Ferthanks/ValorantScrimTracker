const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.6:8080/api';

async function request(method, path, body = null, params = null) {
    let url = `${API_URL}${path}`;

    if (params) {
        const query = Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        if (query) {
            url += `?${query}`;
        }
    }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const error = new Error('Erro na requisição');
        error.response = { status: response.status, data };
        throw error;
    }

    return { data };
}

const api = {
    get: (path, config) => request('GET', path, null, config?.params),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path),
};

export default api;