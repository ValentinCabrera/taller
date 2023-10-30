import { useState } from "react";
import ServicioTablActivos from "./ServicioTablaActivos";
import ServicioTablaEliminados from "./ServicioTablaEliminados";

export default function Marcas() {
    const [frame, setFrame] = useState(true);

    const tablaActivos = <ServicioTablActivos
        changeFrame={<button className="head-button" onClick={() => setFrame(false)}>Recuperar</button>} />;

    const tablaEliminados = <ServicioTablaEliminados changeFrame={<button className="head-button" onClick={() => setFrame(true)}>Activos</button>} />;

    return (
        <div>
            {frame ? tablaActivos : tablaEliminados}
        </div >
    )
};
