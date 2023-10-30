import { useState, useEffect } from "react";
import { postNewOrden, postDeleteOrden, postAlterModelo } from "../../Utils/Orden";

import FrameClientes from "../Clientes/FrameClientes";
import FrameVehiculos from "../Vehiculos/FrameVehiculos";
import { FrameServicios } from "../Servicios/FrameServicios";

export default function DetailOrden(props) {
    const [cliente, setCliente] = useState();
    const [vehiculo, setVehiculo] = useState();
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        if (props.orden) {
            setCliente(props.orden.cliente);
            setVehiculo(props.orden.vehiculo);
            setServicios(props.orden.servicios);
        } else {
            setCliente();
            setVehiculo();
            setServicios([]);
        }
        document.getElementById("descripcion_orden").value = "";


    }, [props.orden])

    function handleNewOrden() {
        let descripcion = document.getElementById("descripcion_orden");


        if (cliente && vehiculo && servicios) {
            postNewOrden(cliente.id, vehiculo.patente, servicios, descripcion.value)
                .then(response => {
                    alert(`La orden ${response.id} se creo con exito.`);
                    props.setForceRender({});
                    props.handleSetModal();
                })
                .catch(error => alert(error));

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleAlterOrden() {
        let descripcion = props.orden.descripcion;
        let descripcion_input = document.getElementById("descripcion_orden");

        if (descripcion_input.value) descripcion = descripcion_input.value;

        postAlterModelo({ "id": props.orden.id, servicios: servicios, "cliente": { "id": cliente.id }, vehiculo: { patente: vehiculo.patente }, descripcion: descripcion })
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