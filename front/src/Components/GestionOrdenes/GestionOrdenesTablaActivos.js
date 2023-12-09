import { getOrdenes, postDeleteOrden } from "../../Utils/Orden";
import DetailOrden from "../Ordenes/DetailOrden";
import CreateTable from '../Partials/CreateTable';

export default function OrdenTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getOrdenes}
            fetchDelete={postDeleteOrden}
            title="Gestion de Ordenes"
            DetailComponent={DetailOrden}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};
