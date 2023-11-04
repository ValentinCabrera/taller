import DetailMarca from './DetailMarca';
import { getMarcas, postDeleteMarca } from "../../Utils/Marca";
import CreateTable from '../Partials/CreateTable';

export default function MarcaTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getMarcas}
            fetchDelete={postDeleteMarca}
            title="Marcas"
            DetailComponent={DetailMarca}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};