import { useEffect, useState } from "react"
import Select from "../Select";
import DetailTecnico from "./DetailTecnico"
import { getTecnicos } from "../../Utils/Tecnico";

export function FrameTecnicos(props) {
    const [tecnicos, setTecnicos] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getTecnicos().then(response => setTecnicos(response));
    }, [])

    function handleAddTecnico(newTecnico) {
        let existe = props.tecnicos.some(tecnico => tecnico.nombre === newTecnico.nombre);

        if (!existe) {
            let newTecnicos = [...props.tecnicos, newTecnico];
            props.setTecnicos(newTecnicos);
            setModal(false);
        } else alert(`El tecnico "${newTecnico.nombre}" ya esta en la orden.`)
    }

    function handleRemoveTecnico(removeTecnico) {
        let result = window.confirm(`¿Estas seguro de eliminar el tecnico "${removeTecnico.nombre}" de la orden?`);

        if (result) {
            let newTecnicos = [...props.tecnicos].filter(item => item !== removeTecnico);
            props.setTecnicos(newTecnicos);
        }
    }

    function handleSetModal() {
        setModal(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Tecnicos: </p>
                <div>{props.tecnicos.length > 0 ? <p>{props.tecnicos.length} seleccionados</p> : <p>Ninguno</p>}</div>
                <button className='modal-close-button' onClick={() => setModal(true)}>+</button>
            </div>
            <Select
                data={props.tecnicos}
                itemName={[["nombre"]]}
                itemKey="nombre"
                setCurrentItem={handleRemoveTecnico} />

            {modal &&
                <div class="modal-background">
                    <div class="modal-content scroll h100">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <Select
                            data={tecnicos}
                            itemName={[["nombre"]]}
                            itemKey="nombre"
                            setCurrentItem={handleAddTecnico} />
                    </div>
                </div>
            }
        </div>
    )
}