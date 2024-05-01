import { useEffect, useState } from "react";
import { getEstadoGestion } from "../../Utils/EstadoGestion";

export default function FrameEstadoGestion(props) {
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        getEstadoGestion().then(response => {
            setOpciones(response);
        });
    }, []);

    const actualizarEstado = (event) => {
        const selectedEstado = event.target.value;
        props.setEstadoGestion(selectedEstado);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p className="detail-cliente-label">Estado: </p>
                <select id="estadoGestion_orden" className='modal-close-input' onChange={actualizarEstado} value={props.estadoGestion ? props.estadoGestion.id : ""}>
                    <option value="" disabled>Selecciona un estado</option>
                    {opciones.map((opcion) => (
                        <option key={opcion.id} value={opcion.id}>
                            {opcion.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
