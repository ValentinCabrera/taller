import { useState } from "react";
import ClienteTablaActivos from "./ClienteTablaActivos";
import ClienteTablElimindos from "./ClienteTablaEliminados";

export default function Clientes() {
    const [frame, setFrame] = useState(true);

    const id = "telefono";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
            { column: "Apellido", filter: ["apellido"], row: ["apellido"] },
            { column: "Mail", filter: ["mail"], row: ["mail"] },
            { column: "Telefono", filter: ["telefono"], row: ["telefono"] },
            { column: "Direccion", filter: ["direccion"], row: ["direccion"] },
            { column: "Ultima visita", filter: ["ultima_visita"], row: ["ultima_visita"] }
        ];

    const vocabulary = {
        singular: "cliente",
        id: ["telefono"],
        pronombre: "el"
    };

    const tablaActivos = <ClienteTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        id={id}
        table={table}
        vocabulary={vocabulary} />;

    const tablaEliminados = <ClienteTablElimindos
        changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>}
        id={id}
        table={table}
        vocabulary={vocabulary} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
