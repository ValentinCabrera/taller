import { useState } from "react";
import ModeloTablActivos from "./ModeloTablaActivos";
import ModeloTablaEliminados from "./ModeloTablaEliminados";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <ModeloTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <ModeloTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
