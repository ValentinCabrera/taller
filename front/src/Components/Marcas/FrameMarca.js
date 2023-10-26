import { useEffect, useState } from "react";
import Select from "../Select";
import { getMarcas } from "../../Utils/Marca";
import DetailMarca from "./DetailMarca";

export default function FrameMarca(props) {
    const [marcas, setMarcas] = useState();
    const [modalMarca, setModalMarca] = useState();
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        updateData();
        setModalMarca(false);
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getMarcas()
            .then(response => setMarcas(response));
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Marca: </p>
                {props.marca && <p>{props.marca.nombre}</p>}
                <button onClick={() => setModalMarca(true)}>+</button>
            </div>

            <Select
                data={marcas}
                itemName={[["nombre"]]}
                itemKey="nombre"
                setCurrentItem={props.setMarca} />

            {modalMarca &&
                <div style={{ position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={() => setModalMarca(false)}>Volver</button>
                    <DetailMarca setForceRender={setForceRender} />
                </div>
            }
        </div>
    )
}