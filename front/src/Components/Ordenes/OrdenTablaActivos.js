import { getOrdenes, postDeleteOrden } from "../../Utils/Orden";
import DetailOrden from "./DetailOrden";
import CreateTable from '../Partials/CreateTable';

export default function OrdenTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getOrdenes}
            fetchDelete={postDeleteOrden}
            title="Ordenes"
            DetailComponent={DetailOrden}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};
