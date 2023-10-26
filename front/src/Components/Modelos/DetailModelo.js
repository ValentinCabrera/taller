import { useState, useEffect } from "react";
import FrameMarca from "../Marcas/FrameMarca";
import { postDeleteModelo, postNewModelo } from "../../Utils/Modelo";

export default function DetailModelo(props) {
    const [marca, setMarca] = useState();

    useEffect(() => {
        if (props.modelo) {
            setMarca(props.modelo.marca);
        } else {
            setMarca();
        }
    }, [props.modelo])

    function handleNewModelo() {
        let nombre = document.getElementById("nombre_modelo");

        if (marca && nombre.value) {
            postNewModelo(nombre.value, marca.nombre)
                .then(response => {
                    alert(`El modelo ${marca.nombre} ${nombre.value} se creo con exito.`);
                    props.setForceRender({});
                })
                .catch(error => alert(error));

            nombre.value = "";
            setMarca();

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteModelo() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el modelo ${props.modelo.marca.nombre} ${props.modelo.nombre}?`)

        if (resultado) (
            postDeleteModelo(props.modelo.id)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentModelo();
                })
                .catch(error => { console.log(error) })
        );
    }


    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
            } else if (!/^([A-Z]*[a-z]*)*$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1)
        }
    }


    return (
        <div>
            <div>
                <p>Nombre:</p>
                <input id="nombre_modelo" type="text" placeholder={props.modelo ? props.modelo.nombre : "Hilux"} onChange={handleStringChange}></input>
            </div>

            <FrameMarca setMarca={setMarca} marca={marca} />

            {props.modelo ?
                <div>
                    <button><p>Modificar modelo</p></button>
                    <button onClick={handleDeleteModelo}><p>Eliminar modelo</p></button>
                </div>
                :
                <button onClick={handleNewModelo}><p>Crear modelo</p></button>
            }
        </div>
    );
}