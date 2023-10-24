import { useState, useEffect } from "react";
import { getModelos, getClientes, postNewVehiculo, postDeleteVehiculo, postRecoverVehiculo } from "../../Utils/Fetchs";

import FrameModelos from "../Modelos/FrameModelos";
import FrameClientes from "../Clientes/FrameClientes";

export default function DetailVehiculo(props) {
    const [cliente, setCliente] = useState();
    const [modelo, setModelo] = useState();
    const [patente, setPatente] = useState(["", "", "", "", "", ""]);
    const [focus, setFocus] = useState();

    useEffect(() => {
        if (focus) {
            let divPatente = document.getElementById("patente");
            let inputs = divPatente.querySelectorAll("input");

            if (focus >= 0) inputs[focus].focus();
        }
    })

    useEffect(() => {
        if (props.vehiculo) {
            setCliente(props.vehiculo.cliente);
            setModelo(props.vehiculo.modelo);
        }
    }, [props.vehiculo])

    function getPatente() {
        let pantenteStr = "";
        patente.map(char => (pantenteStr += char));

        return pantenteStr;
    }

    function handleNewVehiculo() {
        let año = document.getElementById("año");

        if (getPatente().length === 6 && modelo && cliente && año.value) {
            if (2023 >= parseInt(año.value) && parseInt(año.value) >= 1886) {
                postNewVehiculo(getPatente(), modelo.id, cliente.id, año.value)
                    .then(response => {
                        alert(`El vehiculo ${getPatente()} se creo con exito.`);
                        props.setForceRender({});
                    })
                    .catch(error => alert(`El vehiculo con la patente ${getPatente()} ya existe.`));

                const inputs = document.querySelectorAll("input");
                inputs.forEach(input => {
                    input.value = "";
                });
                setPatente(["", "", "", "", "", ""]);
                setModelo();
                setCliente();

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
            if (!/^\d*$/.test(e.target.value) || e.target.value.length >= 5) e.target.value = e.target.value.slice(0, -1)
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

            <FrameModelos setModelo={setModelo} modelo={modelo} />
            <FrameClientes setCliente={setCliente} cliente={cliente} />

            {props.vehiculo ?
                <div>
                    <button><p>Modificar vehiculo</p></button>
                    <button onClick={handleDeleteVehiculo}><p>Eliminar vehiculo</p></button>
                </div>
                :
                <button onClick={handleNewVehiculo}><p>Crear vehiculo</p></button>
            }
        </div>
    );
}