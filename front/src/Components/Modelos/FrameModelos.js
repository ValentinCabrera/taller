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

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Modelo: </p>
                {props.modelo && <p>{props.modelo.nombre} {props.modelo.marca.nombre}</p>}
                <button onClick={() => setModalModelo(true)}>+</button>
            </div>

            <Select
                data={modelos}
                itemName={[["nombre"]]}
                itemKey="id"
                setCurrentItem={props.setModelo} />

            {modalModelo &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalModelo(false)}>Volver</button>
                    <DetailModelo setForceRender={setForceRender} />
                </div>
            }
        </div>
    )
}