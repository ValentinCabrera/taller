
import React, { useEffect, useState } from 'react';
import DetailMarca from './DetailMarca';
import { getMarcasDeleted, postRecoverMarca } from "../../Utils/Marca";

export default function MarcaTablaEliminados(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getMarcasDeleted().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    function handleRecoverMarca(marca) {
        postRecoverMarca(marca.nombre)
            .then(response => {
                setForceRender({});
                alert(`Marca ${marca.nombre} recuperada con exito.`)
            })
            .catch(error => console.log(error))
    }

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }


    const filteredData = items.filter((item) => {
        if (filterColumn) {
            const valueToSearch = item[filterColumn];
            return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return true;
        }
    });

    return (
        <div>
            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Eliminados</h1>
                    {props.changeFrame}
                </div>
                <div className='row'>
                    <input
                        type="search"
                        placeholder="Buscar..."
                        value={searchTerm}
                        className='finder'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table className="cliente-table">
                <thead>
                    <tr>
                        <th>
                            <button className={filterColumn === 'nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick('nombre')}>
                                Nombre
                            </button>
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nombre}</td>
                            <td className='action-box'>
                                <button className='action-button green' onClick={() => handleRecoverMarca(item)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
