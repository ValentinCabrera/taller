import { useState, useEffect } from "react";
import { getModelos, getClientes, postNewVehiculo, postDeleteVehiculo, postRecoverVehiculo } from "../Utils/Fetchs";
import NewModelo from "./NewModelo";
import Select from "./Select";

export default function DetailVehiculo(props) {
    const [modelos, setModelos] = useState();
    const [clientes, setClientes] = useState();
    const [modalModelo, setModalModelo] = useState();
    const [modelo, setModelo] = useState();

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        getModelos()
            .then(response => setModelos(response));

        getClientes()
            .then(response => setClientes(response));
    }

    function getPatente() {
        let divPatente = document.getElementById("patente");
        let inputs = divPatente.querySelectorAll("input");

        let patente = "";
        Array.from(inputs).map(input => (patente += input.value));

        return patente;
    }

    function handleNewVehiculo() {
        let patente = getPatente();
        let modelo = document.getElementById("modelo");
        let cliente = document.getElementById("cliente");
        let año = document.getElementById("año");

        if (patente.length === 6 && modelo.value && cliente.value && año.value) {
            if (2023 >= parseInt(año.value) && parseInt(año.value) >= 1886) {

                postNewVehiculo(patente, modelo.value, cliente.value)
                    .then(response => {
                        alert(`El vehiculo ${patente} se creo con exito.`);
                        props.setForceRender({})
                    })
                    .catch(error => alert(`El vehiculo con la patente ${patente} ya existe.`));

                const inputs = document.querySelectorAll("input");

                inputs.forEach(input => {
                    input.value = "";
                });

            } else alert("El año del vehiculo debe ser entre 1886 y 2023.")

        } else
            alert("Por favor, rellena todos los campos.");
    };


    function handlePatenteChange(e) {
        let divPatente = document.getElementById("patente");
        let inputs = divPatente.querySelectorAll("input");
        let pos = parseInt(e.target.getAttribute('pos'));

        if (e.nativeEvent.inputType === "deleteContentBackward" && e.target.value.length === 0 && pos > 0) inputs[pos - 1].focus();
        else if (e.target.value.length >= 1) {
            e.target.value = e.target.value[0].toUpperCase();

            if (pos < 3 && !/^[A-Z]$/.test(e.target.value)) e.target.value = "";
            else if (pos >= 3 && !/^\d$/.test(e.target.value)) e.target.value = "";

            if (e.target.value.length > 0) {
                if (pos < 5) inputs[pos + 1].focus();
            }
        }

    }

    function handleDeleteVehiculo() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el vehiculo ${props.vehiculo.patente}?`)

        if (resultado) (
            postDeleteVehiculo(props.vehiculo.patente)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentVehiculo();
                })
                .catch(error => { console.log(error) })
        );
    }

    function handleAñoChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (!/^\d*$/.test(e.target.value) || e.target.value.length >= 5) e.target.value = e.target.value.slice(0, -1)
        }
    }

    function PatenteRender() {
        let inputs = []

        for (let i = 0; i < 6; i++) {
            let placeHolder = (i <= 2) ? "A" : "1"
            inputs.push(<input key={i} pos={i} type="text" onChange={handlePatenteChange} style={{ width: 20, margin: 10 }} placeholder={placeHolder}></input>)
            if (i === 2) inputs.push(<p key={`p${i}`}>-</p>)
        };

        return inputs;
    };

    return (
        <div>
            <div>
                <p>Patente:</p>
                <div id="patente" style={{ display: 'flex' }}>{props.vehiculo ? props.vehiculo.patente : <PatenteRender />}</div>
            </div>
            <div>
                <p>Año:</p>
                <input id="año" type="text" onChange={handleAñoChange} placeholder={props.vehiculo ? props.vehiculo.año : "2023"} />
            </div>
            <div>
                <p>Modelo: </p>
                {modelo && <p>{modelo.nombre}</p>}
                {<Select
                    data={modelos}
                    itemName="nombre"
                    itemKey="id"
                    setCurrentItem={setModelo} />}

                <button onClick={() => setModalModelo(true)}>+</button>
                {modalModelo &&
                    <div>
                        <button onClick={() => setModalModelo(false)}>Volver</button>
                        <NewModelo />
                    </div>
                }
            </div>
            <div>
                <p>Cliente: </p>
                <select id="cliente">
                    {clientes && clientes.map(cliente => (
                        <option value={cliente.id} key={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
                    ))}
                </select>
            </div>
            {props.vehiculo ?
                <div>
                    <button>Modificar vehiculo</button>
                    <button onClick={handleDeleteVehiculo}>Eliminar vehiculo</button>
                </div>
                :
                <button onClick={handleNewVehiculo}>Crear vehiculo</button>
            }
        </div>
    );
}