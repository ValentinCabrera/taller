import { useState } from "react";
import VehiculoTablActivos from "./VehiculoTablaActivos";
import VehiculoTablaEliminados from "./VehiculoTablaEliminados";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const table =
        [
            { column: "Patente", filter: ["patente"], row: ["patente"] },
            { column: "Año", filter: ["año"], row: ["año"] },
            { column: "Modelo", filter: ["modelo", "nombre"], row: ["modelo", "nombre"] },
            { column: "Marca", filter: ["modelo", "marca", "nombre"], row: ["modelo", "marca", "nombre"] },
            { column: "Cliente nombre", filter: ["cliente", "nombre"], row: ["cliente", "nombre"] },
            { column: "Cliente apellido", filter: ["cliente", "apellido"], row: ["cliente", "apellido"] }
        ];

    const id = "patente";

    const vocabulary = {
        singular: "vehiculo",
        id: ["patente"],
        pronombre: "el"
    };


    const tablaActivos = <VehiculoTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>}
        table={table}
        vocabulary={vocabulary}
        id={id} />;

    const tablaEliminados = <VehiculoTablaEliminados
        changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>}
        table={table}
        vocabulary={vocabulary}
        id={id} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
