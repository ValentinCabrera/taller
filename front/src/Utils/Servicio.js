import { postFetch, getFetch, host } from "./Fetchs";

export async function postNewServicio(nombre) {
    return postFetch(`${host}api/servicio/new`, { nombre: nombre });
};

export async function getServicios() {
    return getFetch(`${host}api/servicio/listar`)
}

export async function getServiciosDeleted() {
    return getFetch(`${host}api/servicio/listar/deleted`);
}

export async function postDeleteServicio(nombre) {
    return postFetch(`${host}api/servicio/delete`, { nombre: nombre });
}

export async function postRecoverServicio(nombre) {
    return postFetch(`${host}api/servicio/recover`, { nombre: nombre });
}