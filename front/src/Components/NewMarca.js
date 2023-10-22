import { useState } from "react";
import { postNewMarca } from "../Utils/Fetchs";

export default function NewMarca(props) {
    const [nombre, setNombre] = useState();

    function handleNewMarca() {
        if (nombre) {
            postNewMarca(nombre)
                .then(response => {
                    setNombre("");
                    if (props.setModal) {
                        props.updateData();
                        props.setModal(false);
                    }
                });
        }
        else
            alert("Por favor, rellena todos los campos");
    };

    return (
        <div className="form">
            <h2>Crear Marca</h2>
            <input id="nombre" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button onClick={handleNewMarca}>Guardar marca</button>
        </div>
    );
}