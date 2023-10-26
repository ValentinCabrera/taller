import { useEffect, useState } from "react";
import Select from "../Select";
import { getModelos } from "../../Utils/Fetchs";
import NewModelo from "./NewModelo";

export default function FrameModelos(props) {
    const [modelos, setModelos] = useState();
    const [modalModelo, setModalModelo] = useState();

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
                {props.modelo && <p>{props.modelo.marca.nombre} {props.modelo.nombre}</p>}
                <button onClick={() => setModalModelo(true)}>+</button>
            </div>

            <Select
                data={modelos}
                itemName={[["marca", "nombre"], ["nombre"]]}
                itemKey="id"
                setCurrentItem={props.setModelo} />

            {modalModelo &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalModelo(false)}>Volver</button>
                    <NewModelo updateData={updateData} />
                </div>
            }
        </div>
    )
}