import { useEffect, useState } from "react"
import Select from "../Select";
import DetailServicio from "./DetailServicio"
import { getServicios } from "../../Utils/Servicio";

export function FrameServicios(props) {
    const [servicios, setServicios] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getServicios().then(response => setServicios(response));
    }, [])

    function handleAddServicio(newServicio) {
        let existe = props.servicios.some(servicio => servicio.nombre === newServicio.nombre);

        if (!existe) {
            let newServicios = [...props.servicios, newServicio];
            props.setServicios(newServicios);
            setModal(false);
        } else alert(`El servicio "${newServicio.nombre}" ya esta en la orden.`)
    }

    function handleRemoveServicio(removeServicio) {
        let result = window.confirm(`¿Estas seguro de eliminar el servicio "${removeServicio.nombre}" de la orden?`);

        if (result) {
            let newServicios = [...props.servicios].filter(item => item !== removeServicio);
            props.setServicios(newServicios);
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Servicios: </p>
                <div>{props.servicios.length > 0 ? <p>{props.servicios.length} seleccionados</p> : <p>Ninguno</p>}</div>
                <button onClick={() => setModal(true)}>Agregar</button>
            </div>
            <Select
                data={props.servicios}
                itemName={[["nombre"]]}
                itemKey="nombre"
                setCurrentItem={handleRemoveServicio} />

            {modal && <div>
                <button onClick={() => setModal(false)}>Volver</button>

                <Select
                    data={servicios}
                    itemName={[["nombre"]]}
                    itemKey="nombre"
                    setCurrentItem={handleAddServicio} />
            </div>}
        </div>
    )
}