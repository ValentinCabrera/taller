import { useEffect, useState } from "react";
import { getMarcas, getModelos, postDeleteModelo, postNewModelo } from "../Utils/Fetchs";
import NewModelo from "./NewModelo";

function Modelos() {
    const [data, setData] = useState();
    const [currentModelo, setCurrentModelo] = useState();
    const [marcas, setMarcas] = useState();

    useEffect(() => {
        updateData();
    }, []);

    function updateData() {
        getModelos()
            .then(response => {
                setData(response.filter(modelo => modelo.estado === true));
            });

        getMarcas()
            .then(response => {
                setMarcas(response.filter(marca => marca.estado === true))
            })
    }

    function deleteModelo() {
        postDeleteModelo(currentModelo.id)
            .then(response => {
                setCurrentModelo();
            });

        setCurrentModelo();
        updateData();
    };

    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Modelos</h1>
                {data && data.map(modelo => (
                    <div key={modelo.id} onClick={() => setCurrentModelo(modelo)} className="entidad">
                        <p>{modelo.nombre} - {modelo.marca.nombre}</p>
                    </div>
                ))}

                {currentModelo ? <button onClick={() => setCurrentModelo()}>Crear modelo</button> : <></>}
            </div>
            <div>
                {currentModelo ?
                    <div className="form">
                        <h2>Eliminar modelo</h2>
                        <p>Modelo: {currentModelo.nombre}</p>
                        <p>Marca: {currentModelo.marca.nombre}</p>
                        <button onClick={deleteModelo}>Eliminar modelo</button>
                    </div>
                    :
                    <NewModelo />
                }
            </div>
        </div >
    )
};

export default Modelos;