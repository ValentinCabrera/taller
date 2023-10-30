import { useState } from "react";
import VehiculoTablActivos from "./VehiculoTablaActivos";
import VehiculoTablaEliminados from "./VehiculoTablaEliminados";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <VehiculoTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <VehiculoTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
