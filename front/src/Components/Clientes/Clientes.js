import { useState } from "react";
import ClienteTablaActivos from "./ClienteTablaActivos";
import ClienteTablElimindos from "./ClienteTablaEliminados";

export default function Clientes() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <ClienteTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <ClienteTablElimindos changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
