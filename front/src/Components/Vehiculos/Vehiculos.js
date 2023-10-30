import { useEffect, useState } from "react";
import { getVehiculos, getVehiculosDeleted, postRecoverVehiculo } from "../../Utils/Vehiculo";
import Listar from "../Listar";
import DetailVehiculo from "./DetailVehiculo";

export default function Vehiculos() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentVehiculo, setCurrentVehiculo] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    function updateData() {
        getVehiculos().then(response => setActiveData(response));
        getVehiculosDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentVehiculo();
    }

    function handleRecoverVehiculo() {
        postRecoverVehiculo(currentVehiculo.patente)
            .then(response => {
                setForceRender({});
                setCurrentVehiculo();
                alert(`Vehiculo ${currentVehiculo.patente} recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Vehiculos"
            itemName={[["patente"]]}
            itemKey="patente"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentVehiculo() }}>Crear vehiculo</button>}
            currentItem={currentVehiculo}
            setCurrentItem={setCurrentVehiculo} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["patente"]]}
            itemKey="patente"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentVehiculo}
            setCurrentItem={setCurrentVehiculo} />

    function RecoverVehiculo() {
        if (currentVehiculo) return (
            <div>
                <h2>Reucuperar vehiculo</h2>
                <p>Patente: {currentVehiculo.patente}</p>
                <p>Año: {currentVehiculo.año}</p>
                <p>Modelo: {currentVehiculo.modelo.marca.nombre} {currentVehiculo.modelo.nombre}</p>
                <p>Cliente: {currentVehiculo.cliente.nombre} {currentVehiculo.cliente.apellido}</p>
                <button onClick={handleRecoverVehiculo}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailVehiculo vehiculo={currentVehiculo} setForceRender={setForceRender} setCurrentVehiculo={setCurrentVehiculo} /> : <RecoverVehiculo />}
        </div >
    )
};
