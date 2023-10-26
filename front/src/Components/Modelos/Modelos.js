import { useEffect, useState } from "react";
import { getModelos, getModelosDeleted, postRecoverModelo } from "../../Utils/Modelo";
import Listar from "../Listar";
import DetailModelo from "./DetailModelo";

export default function Modelos() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentModelo, setCurrentModelo] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getModelos().then(response => setActiveData(response));
        getModelosDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentModelo();
    }

    function handleRecoverModelo() {
        postRecoverModelo(currentModelo.id)
            .then(response => {
                setForceRender({});
                setCurrentModelo();
                alert(`Modelo ${currentModelo.marca.nombre} ${currentModelo.nombre} recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Modelos"
            itemName={[["nombre"]]}
            itemKey="id"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentModelo() }}>Crear modelo</button>}
            currentItem={currentModelo}
            setCurrentItem={setCurrentModelo} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["nombre"]]}
            itemKey="id"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentModelo}
            setCurrentItem={setCurrentModelo} />

    function RecoverModelo() {
        if (currentModelo) return (
            <div>
                <h2>Reucuperar modelo</h2>
                <p>Nombre: {currentModelo.nombre}</p>
                <p>Marca: {currentModelo.marca.nombre}</p>
                <button onClick={handleRecoverModelo}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailModelo modelo={currentModelo} setForceRender={setForceRender} setCurrentModelo={setCurrentModelo} /> : <RecoverModelo />}
        </div >
    )
};
