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


export async function postNewTecnico(nombre, apellido, telefono) {
    return postFetch(`${host}api/tecnico/new`, { "nombre": nombre, "apellido": apellido, "telefono": telefono });
};

export async function getTecnicos() {
    return getFetch(`${host}api/tecnico/listar`)
}

export async function getTecnicosDeleted() {
    return getFetch(`${host}api/tecnico/listar/deleted`);
}

export async function postAlterTecnico(data) {
    return postFetch(`${host}api/tecnico/alter`, data);
}

export async function postDeleteTecnico(clienteId) {
    return postFetch(`${host}api/tecnico/delete`, { "id": clienteId });
}


export async function postNewMarca(nombre) {
    return postFetch(`${host}api/marca/new`, { "nombre": nombre });
};

export async function getMarcas() {
    return getFetch(`${host}api/marca/listar`)
}

export async function getMarcasDeleted() {
    return getFetch(`${host}api/marca/listar/deleted`);
}

export async function postDeleteMarca(marcaNombre) {
    return postFetch(`${host}api/marca/delete`, { "nombre": marcaNombre });
}


export async function postNewModelo(nombre, marca_nombre) {
    return postFetch(`${host}api/modelo/new`, { "nombre": nombre, "marca": { "nombre": marca_nombre } });
};

export async function getModelos() {
    return getFetch(`${host}api/modelo/listar`)
}

export async function getModelosDeleted() {
    return getFetch(`${host}api/modelo/listar/deleted`);
}

export async function postAlterModelo(data) {
    return postFetch(`${host}api/modelo/alter`, data);
}

export async function postDeleteModelo(modeloId) {
    return postFetch(`${host}api/modelo/delete`, { "id": modeloId });
}

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