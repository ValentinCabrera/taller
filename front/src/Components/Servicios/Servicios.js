import { useState } from "react";
import ServicioTablActivos from "./ServicioTablaActivos";
import ServicioTablaEliminados from "./ServicioTablaEliminados";

export default function Servicios() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
        ];

    const vocabulary = {
        singular: "servicio",
        id: ["id"],
        pronombre: "el"
    };

    const tablaActivos = <ServicioTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <ServicioTablaEliminados
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