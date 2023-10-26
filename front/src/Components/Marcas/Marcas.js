import { useEffect, useState } from "react";
import { getMarcas, getMarcasDeleted, postRecoverMarca } from "../../Utils/Marca";
import Listar from "../Listar";
import DetailMarca from "./DetailMarca";

export default function Marcas() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentMarca, setCurrentMarca] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getMarcas().then(response => setActiveData(response));
        getMarcasDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentMarca();
    }

    function handleRecoverMarca() {
        postRecoverMarca(currentMarca.nombre)
            .then(response => {
                setForceRender({});
                setCurrentMarca();
                alert(`Marca ${currentMarca.nombre} recuperada con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Marcas"
            itemName={[["nombre"]]}
            itemKey="nombre"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentMarca() }}>Crear marca</button>}
            currentItem={currentMarca}
            setCurrentItem={setCurrentMarca} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["nombre"]]}
            itemKey="nombre"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentMarca}
            setCurrentItem={setCurrentMarca} />

    function RecoverMarca() {
        if (currentMarca) return (
            <div>
                <h2>Reucuperar marca</h2>
                <p>Nombre: {currentMarca.nombre}</p>
                <button onClick={handleRecoverMarca}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailMarca marca={currentMarca} setForceRender={setForceRender} setCurrentMarca={setCurrentMarca} /> : <RecoverMarca />}
        </div >
    )
};
