import { useEffect, useState } from "react";
import { getEstadosGestion } from "../../Utils/EstadoGestion";

export default function FrameEstadoGestion(props) {
    const [estadoGestions, setEstadosGestion] = useState();
    const [modalEstadoGestion, setModalEstadoGestion] = useState();
    const [forceRender, setForceRender] = useState();
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        updateData();
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getEstadosGestion()
            .then(response => setEstadosGestion(response));
    }

    function updateData() {
        getEstadosGestion().then(response => {
            setEstadosGestion(response);

            const nombresEstados = response.map(estado => estado.nombre);
            setOpciones(nombresEstados);
        });
    }

    function handleSetModal() {
        setModalEstadoGestion(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p className="detail-cliente-label">Estado: </p>
                {props.estadoGestion && <p>{props.estadoGestion.nombre}</p>}

                <select id="estadoGestion_orden" className='modal-close-input'>
                    <option value="">...</option>

                    {opciones.map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>
           
        </div>
    )
}