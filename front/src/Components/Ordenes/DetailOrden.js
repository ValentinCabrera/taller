import { useState, useEffect } from "react";
import { postNewOrden, postDeleteOrden } from "../../Utils/Orden";

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

    return (
        <div>
            <FrameClientes setCliente={setCliente} cliente={cliente} />
            <FrameVehiculos setVehiculo={setVehiculo} vehiculo={vehiculo} />
            <FrameServicios setServicios={setServicios} servicios={servicios} />
            <div>
                <p>Descripcion:</p>
                <input id="descripcion_orden" type="text" placeholder="El motor tiene una falla" />
            </div>

            {props.orden ?
                <div>
                    <button><p>Modificar orden</p></button>
                    <button onClick={handleDeleteOrden}><p>Eliminar orden</p></button>
                </div>
                :
                <button onClick={handleNewOrden}><p>Crear orden</p></button>
            }
        </div>
    );
}