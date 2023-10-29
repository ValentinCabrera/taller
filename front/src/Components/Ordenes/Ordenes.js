import { useEffect, useState } from "react";
import { getOrdenes, getOrdenesDeleted, postRecoverOrden } from "../../Utils/Orden";
import Listar from "../Listar";
import DetailOrden from "./DetailOrden";

export default function Ordenes() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentOrden, setCurrentOrden] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getOrdenes().then(response => setActiveData(response));
        getOrdenesDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentOrden();
    }

    function handleRecoverOrden() {
        postRecoverOrden(currentOrden.id)
            .then(response => {
                setForceRender({});
                setCurrentOrden();
                alert(`Orden ${currentOrden.id} recuperada con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Ordenes"
            itemName={[["id"]]}
            itemKey="id"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentOrden() }}>Crear orden</button>}
            currentItem={currentOrden}
            setCurrentItem={setCurrentOrden} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["id"]]}
            itemKey="id"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentOrden}
            setCurrentItem={setCurrentOrden} />

    function RecoverOrden() {
        if (currentOrden) return (
            <div>
                <h2>Reucuperar orden</h2>
                <p>Id: {currentOrden.id}</p>
                <p>Cliente: {currentOrden.cliente.nombre} {currentOrden.cliente.apellido}</p>
                <button onClick={handleRecoverOrden}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailOrden orden={currentOrden} setForceRender={setForceRender} setCurrentOrden={setCurrentOrden} /> : <RecoverOrden />}
        </div >
    )
};
