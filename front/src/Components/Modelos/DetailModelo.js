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
                    props.handleSetModal();
                })
                .catch(error => alert(error));

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z-]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }


    return (
        <div>

            {props.modelo ?
                <div>
                    <p className="detail-cliente-label">Nombre: {props.modelo.nombre}</p>
                    <p className="detail-cliente-label">Marca: {props.modelo.marca.nombre}</p>
                </div>
                :
                <div>
                    <div>
                        <p className="detail-cliente-label">Nombre:</p>
                        <input className="detail-cliente-input" id="nombre_modelo" type="text" placeholder={props.modelo ? props.modelo.nombre : "Hilux"} onChange={handleStringChange}></input>
                    </div>


                    <FrameMarca setMarca={setMarca} marca={marca} />
                    <button className="detail-cliente-button" onClick={handleNewModelo}><p>Crear modelo</p></button>
                </div>
            }
        </div>
    );
}