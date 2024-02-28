import { useState, useEffect } from "react";
import { postNewOrden, postDeleteOrden, postAlterOrden } from "../../Utils/Orden";

import FrameClientes from "../Clientes/FrameClientes";
import FrameVehiculos from "../Vehiculos/FrameVehiculos";
import { FrameServicios } from "../Servicios/FrameServicios";
import FrameTecnicos from "../Tecnicos/FrameTecnicos";
import FrameEstadoGestion from "../GestionOrdenes/FrameEstadoGestion";

export default function DetailOrden(props) {
    const [cliente, setCliente] = useState();
    const [vehiculo, setVehiculo] = useState();
    const [servicios, setServicios] = useState([])
    const [tecnico, setTecnicos] = useState([])
    const [estadoGestion, setEstadoGestion] = useState()

    var now = new Date();
    var localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    var maxDatetime = localDatetime.toISOString().slice(0, 16);

    useEffect(() => {
        if (props.orden) {
            setCliente(props.orden.cliente);
            setVehiculo(props.orden.vehiculo);
            setServicios(props.orden.servicios);
            setTecnicos(props.orden.tecnico);
            setEstadoGestion(props.orden.estadoGestion);
        } else {
            setCliente();
            setVehiculo();
            setServicios([]);
            setTecnicos();
            setEstadoGestion();
        }
        document.getElementById("fecha_orden").value = "";
        document.getElementById("descripcion_orden").value = "";

    }, [props.orden])

    const formatDate = (date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    function handleNewOrden() {
        let fechaInput = document.getElementById("fecha_orden");
        let fecha = new Date(fechaInput.value); // Convertir el valor del input a un objeto Date
        let fechaFormateada = formatDate(fecha); // Formatear la fecha
        let descripcion = document.getElementById("descripcion_orden");

        if (cliente && vehiculo && servicios && descripcion && tecnico && fechaInput && estadoGestion) {
            postNewOrden(cliente.id, vehiculo.patente, servicios, descripcion.value, tecnico.id, fechaFormateada, estadoGestion)
                .then(response => {
                    alert(`La orden ${response.id} se creo con exito.`);
                    props.setForceRender({});
                    props.handleSetModal();
                })
                .catch(error => alert(error));
        } else {
            alert("Por favor, rellena todos los campos.");
        }
    };

    function handleAlterOrden() {
        let descripcion = props.orden.descripcion;
        let descripcion_input = document.getElementById("descripcion_orden");

        if (descripcion_input.value) descripcion = descripcion_input.value;

        postAlterOrden({ "id": props.orden.id, servicios: servicios, "cliente": { "id": cliente.id }, vehiculo: { patente: vehiculo.patente }, descripcion: descripcion, "estadoGestion": { "id": estadoGestion.id } })
            .then(response => {
                alert(`La orden ${props.orden.id} se modifico con exito.`);
                props.setForceRender({});
                props.setCurrentOrden();
            })
            .catch(error => alert(`La orden ${props.orden.id} no se pudo modificar.`));
    };

    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z0-9,-.]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    return (
        <div>
            <FrameClientes setCliente={setCliente} cliente={cliente} />
            <FrameVehiculos setVehiculo={setVehiculo} vehiculo={vehiculo} />
            <FrameServicios setServicios={setServicios} servicios={servicios} />
            <FrameTecnicos setTecnicos={setTecnicos} tecnico={tecnico} />

            <div>
                <label className="detail-cliente-label">Fecha: </label>
                <input id="fecha_orden" type="datetime-local" max={maxDatetime} className="detail-cliente-input" />
            </div>

            <FrameEstadoGestion setEstadoGestion={setEstadoGestion} estadoGestion={estadoGestion} />

            <div>
                <p className='modal-close-label'>Descripcion:</p>
                <input className='modal-close-input' id="descripcion_orden" type="text" placeholder={props.orden && props.orden.descripcion ? props.orden.descripcion : "El motor tiene una falla"} onChange={handleStringChange} />
            </div>

            {props.orden ?
                <div>
                    <button className='modal-close-button' onClick={handleAlterOrden}><p>Modificar orden</p></button>
                </div>
                :
                <button className='modal-close-button' onClick={handleNewOrden}><p>Crear orden</p></button>
            }
        </div>
    );
}