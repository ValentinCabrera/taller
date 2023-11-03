import { getFetch, postFetch, host } from "./Fetchs";

export async function postNewVehiculo(patente, modelo, cliente, año) {
    return postFetch(`${host}api/vehiculo/new`, { patente: patente, modelo: { "id": modelo }, cliente: { "id": cliente }, año: año });
};

export async function postAlterVehiculo(data) {
    return postFetch(`${host}api/vehiculo/alter`, data);
}

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