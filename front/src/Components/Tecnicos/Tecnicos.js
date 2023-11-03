import { useState } from "react";
import TecnicoTablaActivos from "./TecnicoTablaActivos";
import TecnicoTablaEliminados from "./TecnicoTablaEliminados";

export default function Tecnicos() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
            { column: "Apellido", filter: ["apellido"], row: ["apellido"] },
            { column: "Telefono", filter: ["telefono"], row: ["telefono"] },
        ];

    const vocabulary = {
        singular: "tecnico",
        id: ["id"],
        pronombre: "el"
    };

    const tablaActivos = <TecnicoTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <TecnicoTablaEliminados
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