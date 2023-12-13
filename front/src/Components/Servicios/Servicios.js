import { useState } from "react";
import ServicioTablaActivos from "./ServicioTablaActivos";
import ServicioTablaEliminados from "./ServicioTablaEliminados";

export default function Servicios() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Nombre", filter: ["nombre"], row: ["nombre"] },
            { column: "Precio", filter: ["precio"], row: ["precio"] },
        ];

    const vocabulary = {
        singular: "servicio",
        id: ["id"],
        pronombre: "el"
    };

    const tablaActivos = <ServicioTablaActivos
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