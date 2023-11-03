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

    function handleSetModal() {
        setModalCliente(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Cliente: </p>
                {props.cliente && <p>{props.cliente.nombre} {props.cliente.apellido}</p>}
                <button className='modal-close-button' onClick={() => setModalCliente(true)}>+</button>
            </div>

            <Select
                data={clientes}
                itemName={[["nombre"], ["apellido"]]}
                itemKey="telefono"
                setCurrentItem={props.setCliente} />

            {modalCliente &&
                <div class="modal-background">
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailCliente setForceRender={setForceRender} handleSetModal={setModalCliente} />                        </div>
                </div>
            }
        </div>
    )
}