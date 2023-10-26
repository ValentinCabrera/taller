import { useEffect, useState } from "react";
import Select from "../Select";
import { getClientes } from "../../Utils/Cliente";
import DetailCliente from "./DetailCliente";

export default function FrameClientes(props) {
    const [clientes, setClientes] = useState();
    const [modalCliente, setModalCliente] = useState();
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        updateData();
        setModalCliente(false);
    }, [forceRender])

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
                itemName={[["nombre"], ["apellido"]]}
                itemKey="id"
                setCurrentItem={props.setCliente} />

            {modalCliente &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalCliente(false)}>Volver</button>
                    <DetailCliente setForceRender={setForceRender} />
                </div>
            }
        </div>
    )
}