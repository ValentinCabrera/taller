import React, { useEffect, useState } from "react";
import Select from "../Select";
import { getVehiculosPorTecnico } from "../../Utils/Vehiculo";
import DetailVehiculo from "./DetailVehiculo";

export default function FrameVehiculoPorTecnico(props) {
    const [vehiculos, setVehiculos] = useState([]);
    const [modalVehiculo, setModalVehiculo] = useState(false);

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        getVehiculosPorTecnico(props.tecnicoId).then(response => setVehiculos(response));
    }

    function handleSetModal() {
        setModalVehiculo(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Vehiculo: </p>
                {props.vehiculo && <p>{props.vehiculo.patente}</p>}
            </div>

            <Select
                data={vehiculos}
                itemName={[["patente"]]}
                itemKey="patente"
            />

            {modalVehiculo &&
                <div className="modal-background">
                    <div className="modal-content scroll h100">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailVehiculo />
                    </div>
                </div>
            }
        </div>
    )
}
