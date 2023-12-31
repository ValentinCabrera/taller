import { postFetch, getFetch, host } from "./Fetchs";

export async function postNewOrden(cliente_id, vehiculo_patente, servicios, descripcion) {
    return postFetch(`${host}api/orden/new`, { cliente: { id: cliente_id }, vehiculo: { patente: vehiculo_patente }, servicios: servicios, descripcion: descripcion });
};

export async function getOrdenes() {
    return getFetch(`${host}api/orden/listar`)
}

export async function getOrdenesDeleted() {
    return getFetch(`${host}api/orden/listar/deleted`);
}

export async function postAlterModelo(data) {
    return postFetch(`${host}api/orden/alter`, data);
}

export async function postDeleteOrden(id) {
    return postFetch(`${host}api/orden/delete`, { id: id });
}

export async function postRecoverOrden(id) {
    return postFetch(`${host}api/orden/recover`, { id: id });
}