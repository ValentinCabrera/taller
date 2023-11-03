import { postFetch, getFetch, host } from "./Fetchs";

export async function postNewMarca(nombre) {
    return postFetch(`${host}api/marca/new`, { "nombre": nombre });
};

export async function getMarcas() {
    return getFetch(`${host}api/marca/listar`)
}

export async function getMarcasDeleted() {
    return getFetch(`${host}api/marca/listar/deleted`);
}

export async function postDeleteMarca(nombre) {
    return postFetch(`${host}api/marca/delete`, { nombre: nombre });
}

export async function postRecoverMarca(nombre) {
    return postFetch(`${host}api/marca/recover`, { nombre: nombre });
}