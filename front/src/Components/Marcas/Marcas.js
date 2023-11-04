import { useState } from "react";
import MarcaTablaEliminados from "./MarcaTablaEliminados";
import MarcaTablaActivos from "./MarcaTablaActivos";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
        ];

    const vocabulary = {
        singular: "marca",
        id: ["id"],
        pronombre: "la"
    };

    const tablaActivos = <MarcaTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <MarcaTablaEliminados
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