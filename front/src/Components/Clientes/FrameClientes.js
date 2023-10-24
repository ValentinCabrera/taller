import { useEffect, useState } from "react";
import Select from "../Select";
import { getClientes } from "../../Utils/Fetchs";
import NewCliente from "./NewCliente";

export default function FrameClientes(props) {
    const [clientes, setClientes] = useState();
    const [modalCliente, setModalCliente] = useState();

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getClientes()
            .then(response => setClientes(response));
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Cliente: </p>
                {props.cliente && <p>{props.cliente.nombre} {props.cliente.apellido}</p>}
                <button onClick={() => setModalCliente(true)}>+</button>
            </div>

            <Select
                data={clientes}
                itemName="nombre"
                itemKey="id"
                setCurrentItem={props.setCliente} />

            {modalCliente &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalCliente(false)}>Volver</button>
                    <NewCliente updateData={updateData} />
                </div>
            }
        </div>
    )
}