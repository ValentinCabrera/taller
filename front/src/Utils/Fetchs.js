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


export async function postNewVehiculo(patente, modelo, cliente, año) {
    return postFetch(`${host}api/vehiculo/new`, { patente: patente, modelo: { "id": modelo }, cliente: { "id": cliente }, año: año });
};

export async function getVehiculos() {
    return getFetch(`${host}api/vehiculo/listar`);
}

export async function postRecoverVehiculo(patente) {
    return postFetch(`${host}api/vehiculo/recover`, { patente: patente });
}

export async function getVehiculosDeleted() {
    return getFetch(`${host}api/vehiculo/listar/deleted`);
}

export async function postDeleteVehiculo(patente) {
    return postFetch(`${host}api/vehiculo/delete`, { "patente": patente });
}