import { getServiciosDeleted, postRecoverServicio } from "../../Utils/Servicio";
import RecoverTable from '../Partials/RecoverTable';

export default function ServicioTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getServiciosDeleted}
            recoverFetch={postRecoverServicio}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};