import { getTecnicos, postDeleteTecnico } from "../../Utils/Tecnico";
import DetailTecnico from "./DetailTecnico";
import CreateTable from '../Partials/CreateTable';

export default function TecnicoTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getTecnicos}
            fetchDelete={postDeleteTecnico}
            title="Tecnicos"
            DetailComponent={DetailTecnico}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};