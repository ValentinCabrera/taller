import { getOrdenesDeleted, postRecoverOrden } from "../../Utils/Orden";
import RecoverTable from '../Partials/RecoverTable';

export default function GestionOrdenTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getOrdenesDeleted}
            recoverFetch={postRecoverOrden}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};