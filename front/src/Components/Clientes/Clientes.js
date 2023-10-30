import { useEffect, useState } from "react";
import { getClientes, getClientesDeleted, postRecoverCliente } from "../../Utils/Cliente";
import Listar from "../Listar";
import DetailCliente from "./DetailCliente";

export default function Clientes() {
    const [activeData, setActiveData] = useState();
    const [deletedData, setDeletedData] = useState();
    const [frame, setFrame] = useState();
    const [currentCliente, setCurrentCliente] = useState();
    const [forceRender, setForceRender] = useState({});

    useEffect(() => {
        updateData();
    }, [forceRender]);

    useEffect(() => {
        let telefono = document.getElementById("telefono_cliente");
        let nombre = document.getElementById("nombre_cliente");
        let apellido = document.getElementById("apellido_cliente");
        let mail = document.getElementById("mail_cliente");
        let direccion = document.getElementById("direccion_cliente");
        let ultima_visita = document.getElementById("ultima_visita_cliente");

        telefono.value = "";
        nombre.value = "";
        apellido.value = "";
        mail.value = "";
        direccion.value = "";
        ultima_visita.value = "";

    }, [currentCliente])

    function updateData() {
        getClientes().then(response => setActiveData(response));
        getClientesDeleted().then(response => setDeletedData(response));
    }

    function handleSetView() {
        setFrame(!frame);
        setCurrentCliente();
    }

    function handleRecoverCliente() {
        postRecoverCliente(currentCliente.telefono)
            .then(response => {
                setForceRender({});
                setCurrentCliente();
                alert(`Cliente ${currentCliente.nombre} ${currentCliente.apellido} recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const listarActivos =
        <Listar
            data={activeData}
            titulo="Clientes"
            itemName={[["nombre"], ["apellido"]]}
            itemKey="telefono"
            buttonView={<button onClick={handleSetView}>Eliminados</button>}
            buttonCurrent={<button onClick={() => { setCurrentCliente() }}>Crear cliente</button>}
            currentItem={currentCliente}
            setCurrentItem={setCurrentCliente} />

    const listarDeleted =
        <Listar
            data={deletedData}
            titulo="Eliminados"
            itemName={[["nombre"], ["apellido"]]}
            itemKey="telefono"
            buttonView={<button onClick={handleSetView}>Activos</button>}
            currentItem={currentCliente}
            setCurrentItem={setCurrentCliente} />

    function RecoverCliente() {
        if (currentCliente) return (
            <div>
                <h2>Reucuperar cliente</h2>
                <p>Nombre: {currentCliente.nombre}</p>
                <p>Apellido: {currentCliente.apellido}</p>
                <p>Telefono: {currentCliente.telefono}</p>
                <p>Mail: {currentCliente.mail}</p>
                <p>Direccion: {currentCliente.direccion}</p>
                <p>Ultima visita: {currentCliente.ultima_visita}</p>
                <button onClick={handleRecoverCliente}>Recuperar</button>
            </div>
        );
    }

    return (
        <div className="conteiner">
            {!frame ? activeData && listarActivos : deletedData && listarDeleted}
            {!frame ? <DetailCliente cliente={currentCliente} setForceRender={setForceRender} setCurrentCliente={setCurrentCliente} /> : <RecoverCliente />}
        </div >
    )
};
