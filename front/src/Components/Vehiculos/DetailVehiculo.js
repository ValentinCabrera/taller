import { useState, useEffect } from "react";
import { postNewVehiculo, postDeleteVehiculo, postAlterVehiculo } from "../../Utils/Vehiculo";

import FrameModelos from "../Modelos/FrameModelos";
import FrameClientes from "../Clientes/FrameClientes";

export default function DetailVehiculo(props) {
    const [cliente, setCliente] = useState();
    const [modelo, setModelo] = useState();
    const [patente, setPatente] = useState(["", "", "", "", "", ""]);
    const [focus, setFocus] = useState();

    useEffect(() => {
        if (focus) {
            let divPatente = document.getElementById("patente_vehiculo");
            let inputs = divPatente.querySelectorAll("input");

            if (focus >= 0 && inputs) inputs[focus].focus();
        }
    })

    useEffect(() => {
        if (props.vehiculo) {
            setCliente(props.vehiculo.cliente);
            setModelo(props.vehiculo.modelo);
        } else {
            setCliente();
            setModelo();
            setPatente(["", "", "", "", "", ""]);
        }

        document.getElementById("año_vehiculo").value = "";
    }, [props.vehiculo])

    function getPatente() {
        let pantenteStr = "";
        patente.map(char => (pantenteStr += char));

        return pantenteStr;
    }

    function handleNewVehiculo() {
        let año = document.getElementById("año_vehiculo");

        if (getPatente().length === 6 && modelo && cliente && año.value) {
            if (2024 >= parseInt(año.value) && parseInt(año.value) >= 1886) {
                postNewVehiculo(getPatente(), modelo.id, cliente.id, año.value)
                    .then(response => {
                        alert(`El vehiculo ${getPatente()} se creo con exito.`);
                        props.setForceRender({});
                        setPatente(["", "", "", "", "", ""]);
                        año.value = "";
                        setModelo();
                        setCliente();
                    })
                    .catch(error => alert(`El vehiculo con la patente ${getPatente()} ya existe.`));

            } else alert("El año del vehiculo debe ser entre 1886 y 2023.")

        } else
            alert("Por favor, rellena todos los campos.");
    };


    function handlePatenteChange(e) {
        let pos = parseInt(e.target.getAttribute('pos'));
        setFocus(pos);

        if (e.nativeEvent.inputType === "deleteContentBackward") {
            if (patente[pos].length >= 1) {
                let newPatente = [...patente]
                newPatente[pos] = "";
                setPatente(newPatente);
            } else { }
        } else {
            let key = e.nativeEvent.data.toUpperCase();

            if ((pos < 3 && /^[A-Z]$/.test(key)) || (pos >= 3 && /^\d$/.test(key))) {
                let newPatente = [...patente]
                newPatente[pos] = key;
                setPatente(newPatente);
                (pos < 5) ? setFocus(pos + 1) : setFocus(-1);

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
            if (!/^([12]|1[89]|20|1[89][89]|20[0-2]|1[89][89][6-9]|200[0-9]|201[0-9]|202[0-4])$/.test(e.target.value) || e.target.value.length >= 5) e.target.value = e.target.value.slice(0, -1)
        }
    }

    function PatenteRender() {
        let inputs = [];

        for (let i = 0; i < 6; i++) {
            let placeHolder = (i <= 2) ? "A" : "1"
            inputs.push(<input value={patente[i]} key={i} pos={i} type="text" onChange={handlePatenteChange} style={{ width: 20, margin: 10 }} placeholder={placeHolder}></input>)
            if (i === 2) inputs.push(<p key={`p${i}`}>-</p>)
        }

        return inputs;
    };

    function handleAlterVehiculo() {
        let año_input = document.getElementById("año_vehiculo");
        let año = props.vehiculo.año;

        if (año_input.value) {
            if (2024 >= parseInt(año_input.value) && parseInt(año_input.value) >= 1886) {
                año = año_input.value;
            } else return alert("El año del vehiculo debe ser entre 1886 y 2023.")
        }

        postAlterVehiculo({ "patente": props.vehiculo.patente, "modelo": { "id": modelo.id }, "cliente": { "id": cliente.id }, "año": año })
            .then(response => {
                alert(`El vehiculo ${props.vehiculo.patente} se modifico con exito.`);
                props.setForceRender({});
                props.setCurrentVehiculo();
            })
            .catch(error => alert(`El vehiculo con la patente ${props.vehiculo.patente} no se pudo modificar.`));
    };

    return (
        <div>
            <div>
                <p>Patente:</p>
                <div id="patente_vehiculo" style={{ display: 'flex' }}>{props.vehiculo ? props.vehiculo.patente : <PatenteRender />}</div>
            </div>
            <div>
                <p>Año:</p>
                <input id="año_vehiculo" type="text" onChange={handleAñoChange} placeholder={props.vehiculo ? props.vehiculo.año : "2023"} />
            </div>

            <FrameModelos setModelo={setModelo} modelo={modelo} />
            <FrameClientes setCliente={setCliente} cliente={cliente} />

            {props.vehiculo ?
                <div>
                    <button onClick={handleAlterVehiculo}><p>Modificar vehiculo</p></button>
                    <button onClick={handleDeleteVehiculo}><p>Eliminar vehiculo</p></button>
                </div>
                :
                <button onClick={handleNewVehiculo}><p>Crear vehiculo</p></button>
            }
        </div>
    );
}