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
                })
                .catch(error => alert(error));

            descripcion.value = "";
            setCliente();
            setVehiculo();
            setServicios([]);

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteOrden() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el vehiculo ${props.orden.id}?`)

        if (resultado) (
            postDeleteOrden(props.orden.id)
                .then(response => {
                    props.setForceRender({})
                    props.serCurrentOrden();
                })
                .catch(error => { console.log(error) })
        );
    }

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

    return (
        <div>
            <FrameClientes setCliente={setCliente} cliente={cliente} />
            <FrameVehiculos setVehiculo={setVehiculo} vehiculo={vehiculo} />
            <FrameServicios setServicios={setServicios} servicios={servicios} />
            <div>
                <p>Descripcion:</p>
                <input id="descripcion_orden" type="text" placeholder={props.orden && props.orden.descripcion ? props.orden.descripcion : "El motor tiene una falla"} />
            </div>

            {props.orden ?
                <div>
                    <button onClick={handleAlterOrden}><p>Modificar orden</p></button>
                    <button onClick={handleDeleteOrden}><p>Eliminar orden</p></button>
                </div>
                :
                <button onClick={handleNewOrden}><p>Crear orden</p></button>
            }
        </div>
    );
}