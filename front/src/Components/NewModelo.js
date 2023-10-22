import { getMarcas, postNewModelo } from "../Utils/Fetchs";
import { useState, useEffect } from "react";
import NewMarca from "./NewMarca";

export default function NewModelo() {
    const [marcas, setMarcas] = useState();
    const [modalMarca, setModalMarca] = useState();

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        getMarcas()
            .then(response => setMarcas(response))
    }

    function handleNewModelo() {
        let nombre = document.getElementById("nombre");
        let marca_nombre = document.getElementById("marca_nombre");

        if (nombre.value && marca_nombre.value) {

            postNewModelo(nombre.value, marca_nombre.value);
            nombre.value = marca_nombre.value = "";
        } else
            alert("Por favor, rellena todos los campos");
    };

    return (
        <div className="form">
            <h2>Crear modelo</h2>
            <input id="nombre" type="text" placeholder="Nombre" />
            <select id="marca_nombre">
                {marcas && marcas.map(marca => (
                    <option values={marca.nombre} key={marca.nombre}>{marca.nombre}</option>
                ))}
            </select>
            <button onClick={() => setModalMarca(true)}>+</button>
            {modalMarca &&
                <div>
                    <button onClick={() => setModalMarca(false)}>Volver</button>
                    <NewMarca setModal={setModalMarca} updateData={updateData} />
                </div>
            }
            <button onClick={handleNewModelo}>Guardar modelo</button>
        </div>
    );

}