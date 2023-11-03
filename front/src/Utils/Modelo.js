import { postFetch, getFetch, host } from "./Fetchs";

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

export async function postRecoverModelo(id) {
    return postFetch(`${host}api/modelo/recover`, { id: id });
}