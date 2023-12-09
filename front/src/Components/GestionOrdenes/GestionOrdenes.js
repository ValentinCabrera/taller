import { useState } from "react";
import GestionOrdenesTablaActivos from "./GestionOrdenesTablaActivos";
import GestionOrdenesTablaEliminados from "./GestionOrdenesTablaEliminados";

export default function GestionOrdenes() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Patente", filter: ["vehiculo", "patente"], row: ["vehiculo", "patente"] },
            { column: "Servicio", filter: ["servicio", "nombre"], row: ["servicio", "nombre"] },
            { column: "Tecnico", filter: ["tecnico", "nombre"], row: ["tecnico", "nombre"] },
            { column: "Estado", filter: ["orden","estado"], row: ["orden","estado"] },            
        ];

    const vocabulary = {
        singular: "orden",
        id: ["id"],
        pronombre: "la"
    };

    const tablaActivos = <GestionOrdenesTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <GestionOrdenesTablaEliminados
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
