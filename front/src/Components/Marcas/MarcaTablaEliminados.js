import { getMarcasDeleted, postRecoverMarca } from "../../Utils/Marca";
import RecoverTable from '../Partials/RecoverTable';

export default function MarcaTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getMarcasDeleted}
            recoverFetch={postRecoverMarca}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};