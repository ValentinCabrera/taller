import { getServicios, postDeleteServicio } from "../../Utils/Servicio";
import DetailServicio from './DetailServicio';
import CreateTable from '../Partials/CreateTable';

export default function ServicioTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getServicios}
            fetchDelete={postDeleteServicio}
            title="Servicios"
            DetailComponent={DetailServicio}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};