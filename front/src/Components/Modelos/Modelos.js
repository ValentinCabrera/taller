import { useState } from "react";
import ModeloTablaActivos from "./ModeloTablaActivos";
import ModeloTablaEliminados from "./ModeloTablaEliminados";


export default function Modelos() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
            { column: "Marca", filter: ["marca","nombre"], row: ["marca","nombre"] },
        ];

    const vocabulary = {
        singular: "modelo",
        id: ["id"],
        pronombre: "el"
    };

    const tablaActivos = <ModeloTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <ModeloTablaEliminados
        changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};