import { useState } from "react";
import OrdenTablaActivos from "./OrdenTablaActivos";
import OrdenTablaEliminados from "./OrdenTablaEliminados";

export default function Ordenes() {
    const [frame, setFrame] = useState(true);

    const id = "id";

    const table =
        [
            { column: "Vehiculo", filter: ["vehiculo", "patente"], row: ["vehiculo", "patente"] },
            { column: "Cliente nombre", filter: ["cliente", "nombre"], row: ["cliente", "nombre"] },
            { column: "Cliente apellido", filter: ["cliente", "apellido"], row: ["cliente", "apellido"] },
            { column: "Servicios", filter: ["servicios", "nombre"], row: ["servicios", "nombre"] },
            { column: "Tecnico", filter: ["tecnicos", "nombre"], row: ["tecnicos", "nombre"] },
            { column: "Fecha", filter: ["fecha"], row: ["fecha"] },
            { column: "Estado", filter: ["estadoGestion","nombre"], row: ["estadoGestion","nombre"] }
        ];

    const vocabulary = {
        singular: "orden",
        id: ["id"],
        pronombre: "la"
    };

    const tablaActivos = <OrdenTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        vocabulary={vocabulary}
        id={id}
        table={table} />;

    const tablaEliminados = <OrdenTablaEliminados
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
