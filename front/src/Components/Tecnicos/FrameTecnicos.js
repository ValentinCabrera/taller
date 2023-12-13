import { useEffect, useState } from "react";
import Select from "../Select";
import { getTecnicos } from "../../Utils/Tecnico";
import DetailTecnico from "./DetailTecnico";

export default function FrameTecnicos(props) {
    const [tecnicos, setTecnicos] = useState();
    const [modalTecnico, setModalTecnico] = useState();
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        updateData();
        setModalTecnico(false);
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getTecnicos()
            .then(response => setTecnicos(response));
    }

    function handleSetModal() {
        setModalTecnico(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Tecnico: </p>
                {props.tecnico && <p>{props.tecnico.nombre} {props.tecnico.apellido}</p>}
                <button className='modal-close-button' onClick={() => setModalTecnico(true)}>+</button>
            </div>

            <Select
                data={tecnicos}
                itemName={[["nombre"], ["apellido"]]}
                itemKey="telefono"
                setCurrentItem={props.setTecnicos} 
            />

            {modalTecnico &&
                <div class="modal-background">
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailTecnico setForceRender={setForceRender} handleSetModal={setModalTecnico} />                        </div>
                </div>
            }
        </div>
    )
}