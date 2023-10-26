import { useEffect, useState } from "react";
import { getTecnicos, getTecnicosDeleted, postRecoverTecnico } from "../../Utils/Tecnico";
import Listar from "../Listar";
import DetailTecnico from "./DetailTecnico";


export default function Tecnicos() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentTecnico, setCurrentTecnico] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getTecnicos().then(response => setActiveData(response));
        getTecnicosDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentTecnico();
    }

    function handleRecoverTecnico() {
        postRecoverTecnico(currentTecnico.telefono)
            .then(response => {
                setForceRender({});
                setCurrentTecnico();
                alert(`Tecnico ${currentTecnico.nombre} ${currentTecnico.apellido} recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Tecnicos"
            itemName={[["nombre"], ["apellido"]]}
            itemKey="telefono"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentTecnico() }}>Crear tecnico</button>}
            currentItem={currentTecnico}
            setCurrentItem={setCurrentTecnico} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["nombre"], ["apellido"]]}
            itemKey="telefono"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentTecnico}
            setCurrentItem={setCurrentTecnico} />

    function RecoverTecnico() {
        if (currentTecnico) return (
            <div>
                <h2>Reucuperar tecnico</h2>
                <p>Nombre: {currentTecnico.nombre}</p>
                <p>Apellido: {currentTecnico.apellido}</p>
                <p>Telefono: {currentTecnico.telefono}</p>
                <button onClick={handleRecoverTecnico}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailTecnico tecnico={currentTecnico} setForceRender={setForceRender} setCurrentTecnico={setCurrentTecnico} /> : <RecoverTecnico />}
        </div >
    )
};
