import { useEffect, useState } from "react";
import { getTecnicos, getTecnicosDeleted } from "../../Utils/Fetchs";
import Listar from "../Listar";
import DetailTecnico from "./DetailTecnico";

export default function Tecnicos() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentTecnico, setCurrentTecnico] = useState();

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        getTecnicos()
            .then(response => setActiveData(response));

        getTecnicosDeleted()
            .then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentTecnico();
    }

    const listarActivos = <Listar
        data={activeData}
        titulo="Tecnicos"
        itemName="nombre"
        itemKey="id"
        buttonView={<button onClick={handleSetView}>Eliminados</button>}
        buttonCurrent={<button onClick={() => setCurrentTecnico()}>Crear tecnico</button>}
        currentItem={currentTecnico}
        setCurrentItem={setCurrentTecnico} />

    const listarDeleted = <Listar
        data={deletedData}
        titulo="Eliminados"
        itemName="nombre"
        itemKey="id"
        buttonView={<button onClick={handleSetView}>Activos</button>}
        currentItem={currentTecnico}
        setCurrentItem={setCurrentTecnico} />

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailTecnico tecnico={currentTecnico} /> : <div>Recuperar tecnico</div>}
        </div >
    )
};
