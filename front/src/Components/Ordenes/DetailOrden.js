import { useState, useEffect } from "react";
import { postNewOrden, postAlterOrden } from "../../Utils/Orden";

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

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const maxDatetime = oneYearAgo.toISOString().slice(0, 10);

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
        date = new Date(date);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    function handleNewOrden() {
        let fechaInput = document.getElementById("fecha_orden");
        let fecha = new Date(fechaInput.value);
        let fechaFormateada = formatDate(fecha);
        let descripcion = document.getElementById("descripcion_orden");

        if (cliente && vehiculo && servicios && descripcion && tecnico && fechaInput && estadoGestion) {
            postNewOrden(cliente.id, vehiculo.patente, servicios, descripcion.value, tecnico.id, fechaFormateada, estadoGestion)
                .then(response => {
                    alert(`La orden ${response.id} se creo con exito.`);
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
        let fechaInput = document.getElementById("fecha_orden");
        let fecha = new Date(fechaInput.value);
        let fechaFormateada = formatDate(fecha);

        if (descripcion_input.value) descripcion = descripcion_input.value;

        postAlterOrden({ "id": props.orden.id, servicios: servicios, "cliente": { "id": cliente.id }, "tecnico": { "id": tecnico.id }, vehiculo: { patente: vehiculo.patente }, descripcion: descripcion, fecha: fechaFormateada, "estadoGestion": { "id": estadoGestion.id } })
            .then(response => {
                alert(`La orden ${props.orden.id} se modifico con exito.`);
            })
    };

    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z0-9,-.]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    function parseDateFromString(dateString) {
        const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2})$/;

        const match = dateString.match(datePattern);

        if (match) {
            const day = parseInt(match[1]);
            const month = parseInt(match[2]) - 1;
            const year = parseInt(match[3]);
            const hour = parseInt(match[4]);
            const minute = parseInt(match[5]);

            if (isValidDate(year, month, day, hour, minute)) {
                return new Date(year, month, day, hour, minute);
            }
        }

        return null;
    }

    function isValidDate(year, month, day, hour, minute) {
        const date = new Date(year, month, day, hour, minute);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day &&
            date.getHours() === hour &&
            date.getMinutes() === minute
        );
    }

    let formattedDate = '';
    if (props.orden && props.orden.fecha) {
        const parsedDate = parseDateFromString(props?.orden?.fecha);
        formattedDate = formatDate(parsedDate);
    }

    return (
        <div>
            <FrameClientes setCliente={setCliente} cliente={cliente} />
            <FrameVehiculos setVehiculo={setVehiculo} vehiculo={vehiculo} />
            <FrameServicios setServicios={setServicios} servicios={servicios} />
            <FrameTecnicos setTecnicos={setTecnicos} tecnico={tecnico} />

            {props?.orden?.fecha ?
                <div>
                    <label className="detail-cliente-label">Fecha: </label>
                    <input
                        id="fecha_orden"
                        type="datetime-local"
                        max={maxDatetime}
                        className="detail-cliente-input"
                        value={formattedDate}
                    />
                </div>
                :
                <div>
                    <label className="detail-cliente-label">Fecha: </label>
                    <input id="fecha_orden" type="datetime-local" max={maxDatetime} className="detail-cliente-input" />
                </div>
            }

            <FrameEstadoGestion setEstadoGestion={setEstadoGestion} estadoGestion={estadoGestion} />

            <div>
                <p className='modal-close-label'>Descripcion:</p>
                <input className='modal-close-input' id="descripcion_orden" type="text" placeholder={props.orden && props.orden.descripcion ? props.orden.descripcion : "El motor tiene una falla"} onChange={handleStringChange} />
            </div>

            {props?.orden ?
                <div>
                    <button className='modal-close-button' onClick={handleAlterOrden}><p>Modificar orden</p></button>
                </div>
                :
                <button className='modal-close-button' onClick={handleNewOrden}><p>Crear orden</p></button>
            }
        </div>
    );
}