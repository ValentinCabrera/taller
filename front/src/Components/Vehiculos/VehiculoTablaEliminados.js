import { getVehiculosDeleted, postRecoverVehiculo } from "../../Utils/Vehiculo";
import RecoverTable from '../Partials/RecoverTable';


export default function VehiculoTablaEliminados(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <RecoverTable
            fetchGet={getVehiculosDeleted}
            recoverFetch={postRecoverVehiculo}
            table={table}
            changeFrame={changeFrame}
            id={id}
            vocabulary={vocabulary}
        />
    )
};