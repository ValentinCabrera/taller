import { useState } from "react";
import TecnicoTablaActivos from "./TecnicoTablaActivos";
import TecnicoTablaEliminados from "./TecnicoTablaEliminados";

export default function Tecnicos() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <TecnicoTablaActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <TecnicoTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};

