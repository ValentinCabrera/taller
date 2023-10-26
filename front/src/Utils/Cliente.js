import { postFetch, getFetch, host } from "./Fetchs";

export async function postNewCliente(nombre, apellido, telefono) {
    return postFetch(`${host}api/cliente/new`, { "nombre": nombre, "apellido": apellido, "telefono": telefono });
};

export async function getClientes() {
    return getFetch(`${host}api/cliente/listar`)
}

export async function getClientesDeleted() {
    return getFetch(`${host}api/cliente/listar/deleted`);
}

export async function postAlterCliente(data) {
    return postFetch(`${host}api/cliente/alter`, data);
}

export async function postDeleteCliente(telefono) {
    return postFetch(`${host}api/cliente/delete`, { telefono: telefono });
}

export async function postRecoverCliente(telefono) {
    return postFetch(`${host}api/cliente/recover`, { telefono: telefono });
}