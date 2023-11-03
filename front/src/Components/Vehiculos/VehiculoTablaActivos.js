import CreateTable from '../Partials/CreateTable';
import DetailVehiculo from './DetailVehiculo';
import { getVehiculos, postDeleteVehiculo } from '../../Utils/Vehiculo';

export default function VehiculoTablActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getVehiculos}
            fetchDelete={postDeleteVehiculo}
            title="Vehiculos"
            DetailComponent={DetailVehiculo}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};