import { getModelos, postDeleteModelo } from "../../Utils/Modelo";
import DetailModelo from "./DetailModelo";
import CreateTable from '../Partials/CreateTable';

export default function ModeloTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getModelos}
            fetchDelete={postDeleteModelo}
            title="Modelos"
            DetailComponent={DetailModelo}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};