import { useEffect, useState } from "react";
import { getServicios, getServiciosDeleted, postRecoverServicio } from "../../Utils/Servicio";
import Listar from "../Listar";
import DetailServicio from "./DetailServicio";

export default function Servicios() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentServicio, setCurrentServicio] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getServicios().then(response => setActiveData(response));
        getServiciosDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentServicio();
    }

    function handleRecoverServicio() {
        postRecoverServicio(currentServicio.nombre)
            .then(response => {
                setForceRender({});
                setCurrentServicio();
                alert(`Servicio "${currentServicio.nombre}" recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Servicios"
            itemName={[["nombre"]]}
            itemKey="nombre"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentServicio() }}>Crear servicio</button>}
            currentItem={currentServicio}
            setCurrentItem={setCurrentServicio} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["nombre"]]}
            itemKey="nombre"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentServicio}
            setCurrentItem={setCurrentServicio} />

    function RecoverServicio() {
        if (currentServicio) return (
            <div>
                <h2>Reucuperar servicio</h2>
                <p>Nombre: {currentServicio.nombre}</p>
                <button onClick={handleRecoverServicio}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailServicio servicio={currentServicio} setForceRender={setForceRender} setCurrentServicio={setCurrentServicio} /> : <RecoverServicio />}
        </div >
    )
};
