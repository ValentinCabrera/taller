import { postFetch, getFetch, host } from "./Fetchs";

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

export async function postDeleteTecnico(telefono) {
    return postFetch(`${host}api/tecnico/delete`, { "telefono": telefono });
}


export async function postRecoverTecnico(telefono) {
    return postFetch(`${host}api/tecnico/recover`, { telefono: telefono });
}