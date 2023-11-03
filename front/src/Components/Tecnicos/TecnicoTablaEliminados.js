import { getTecnicosDeleted, postRecoverTecnico } from "../../Utils/Tecnico";
import RecoverTable from '../Partials/RecoverTable';

export default function TecnicoTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getTecnicosDeleted}
            recoverFetch={postRecoverTecnico}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};