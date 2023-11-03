import RecoverTable from '../Partials/RecoverTable';
import { getClientesDeleted, postRecoverCliente } from "../../Utils/Cliente";

export default function ClienteTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getClientesDeleted}
            recoverFetch={postRecoverCliente}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};