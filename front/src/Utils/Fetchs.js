export async function getFetch(url, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Token'] = token;

    const response = await fetch(url, { headers: headers });
    const data = await response.json();
    return data;
};

export async function postFetch(url, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Token'] = token;

    const response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) });

    if (!response.ok) {
        throw new Error(response.status);
    }

    const responseText = await response.text();

    try {
        return JSON.parse(responseText);
    } catch (error) {
        throw new Error("Error al analizar la respuesta JSON");
    }
}

export const host = "http://localhost:8080/";