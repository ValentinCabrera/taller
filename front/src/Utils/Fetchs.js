export const host = "http://localhost:8080/";

async function customFetch(url, requestInit) {
    try {
        const response = await fetch(url, requestInit);
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.log(error);
            return [];
        };
    } catch (error) { throw new Error(error) };
};

export async function getFetch(url, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Token'] = token;

    return customFetch(url, { headers: headers });
};

export async function postFetch(url, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Token'] = token;

    return customFetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) });
};