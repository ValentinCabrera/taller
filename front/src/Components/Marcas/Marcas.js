import { useState } from "react";
import MarcaTablaEliminados from "./MarcaTablaEliminados";
import MarcaTablActivos from "./MarcaTablaActivos";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <MarcaTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <MarcaTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
