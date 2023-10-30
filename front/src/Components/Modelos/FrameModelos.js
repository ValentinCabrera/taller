import { useEffect, useState } from "react";
import Select from "../Select";
import { getModelos } from "../../Utils/Modelo";
import DetailModelo from "./DetailModelo";

export default function FrameModelos(props) {
    const [modelos, setModelos] = useState();
    const [modalModelo, setModalModelo] = useState();
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        updateData();
        setModalModelo(false);
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getModelos()
            .then(response => setModelos(response));
    }

    function handleSetModal() {
        setModalModelo(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Modelo: </p>
                {props.modelo && <p>{props.modelo.nombre} {props.modelo.marca.nombre}</p>}
                <button className='modal-close-button' onClick={() => setModalModelo(true)}>+</button>
            </div>

            <Select
                data={modelos}
                itemName={[[["marca"], ["nombre"]], ["nombre"]]}
                itemKey="id"
                setCurrentItem={props.setModelo} />

            {modalModelo &&
                <div class="modal-background">
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailModelo setForceRender={setForceRender} handleSetModal={setModalModelo} />                    </div>
                </div>
            }
        </div>
    )
}