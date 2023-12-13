import { postFetch, getFetch, host } from "./Fetchs";


export async function getEstadosGestion() {
    return getFetch(`${host}api/estadoGestion/listar`)
}