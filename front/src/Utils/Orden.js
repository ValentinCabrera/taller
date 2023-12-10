import { postFetch, getFetch, host } from "./Fetchs";

export async function postNewOrden(cliente_id, vehiculo_patente, servicios, descripcion, tecnico_id, fecha, estado_gestion) {
    return postFetch(`${host}api/orden/new`, { cliente: { id: cliente_id }, vehiculo: { patente: vehiculo_patente }, servicios: servicios, descripcion: descripcion, fecha: fecha, estado_gestion: estado_gestion, tecnico: { id: tecnico_id } });
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