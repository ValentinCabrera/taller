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
    }, [forceRender])

    useEffect(() => {
        updateData();
    }, [])

    function updateData() {
        getMarcas()
            .then(response => setMarcas(response));
    }

    function handleSetModal() {
        setModalMarca(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p className="detail-cliente-label">Marca: </p>
                {props.marca && <p>{props.marca.nombre}</p>}
                <button className='modal-close-button' onClick={() => setModalMarca(true)}>+</button>
            </div>

            <Select
                data={marcas}
                itemName={[["nombre"]]}
                itemKey="nombre"
                setCurrentItem={props.setMarca} />

            {modalMarca &&
                <div class="modal-background">
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailMarca setForceRender={setForceRender} handleSetModal={setModalMarca} />
                    </div>
                </div>
            }
        </div>
    )
}