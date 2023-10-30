import { useState } from "react";

import OrdenTablActivos from "./OrdenTablaActivos";
import OrdenTablaEliminados from "./OrdenTablaEliminados";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <OrdenTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <OrdenTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
