import { useEffect, useState } from "react";
import Select from "../Select";
import { getVehiculos } from "../../Utils/Vehiculo";
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

    function handleSetModal() {
        setModalVehiculo(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Vehiculo: </p>
                {props.vehiculo && <p>{props.vehiculo.patente}</p>}
                <button className='modal-close-button' onClick={() => setModalVehiculo(true)}>+</button>
            </div>

            <Select
                data={vehiculos}
                itemName={[["patente"]]}
                itemKey="patente"
                setCurrentItem={props.setVehiculo} />

            {modalVehiculo &&
                <div class="modal-background">
                    <div class="modal-content scroll h100">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailVehiculo setForceRender={setForceRender} handleSetModal={setModalVehiculo} />
                    </div>
                </div>
            }
        </div>
    )
}