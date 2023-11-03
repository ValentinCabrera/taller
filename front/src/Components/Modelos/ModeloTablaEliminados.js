
import { getModelosDeleted, postRecoverModelo } from "../../Utils/Modelo";
import RecoverTable from '../Partials/RecoverTable';

export default function ModeloTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getModelosDeleted}
            recoverFetch={postRecoverModelo}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};