import { postFetch, getFetch, host } from "./Fetchs";

export async function getEstadoGestion() {
    return getFetch(`${host}api/estadoGestion/listar`)
}
