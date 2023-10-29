import { useEffect, useState } from "react";
import Select from "../Select";
import { getVehiculos } from "../../Utils/Fetchs";
import DetailVehiculo from "./DetailVehiculo";

export default function FrameVehiculos(props) {
    const [vehiculos, setVehiculos] = useState();
    const [modalVehiculo, setModalVehiculo] = useState();
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        updateData();
        setModalVehiculo(false);
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getVehiculos().then(response => setVehiculos(response));
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Vehiculo: </p>
                {props.vehiculo && <p>{props.vehiculo.patente}</p>}
                <button onClick={() => setModalVehiculo(true)}>+</button>
            </div>

            <Select
                data={vehiculos}
                itemName={[["patente"]]}
                itemKey="patente"
                setCurrentItem={props.setVehiculo} />

            {modalVehiculo &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalVehiculo(false)}>Volver</button>
                    <DetailVehiculo setForceRender={setForceRender} />
                </div>
            }
        </div>
    )
}