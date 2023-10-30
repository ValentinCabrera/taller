
import React, { useEffect, useState } from 'react';
import { getModelosDeleted, postRecoverModelo } from "../../Utils/Modelo";

export default function ModeloTablaEliminados(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getModelosDeleted().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    function handleRecoverItem(item) {
        postRecoverModelo(item.id)
            .then(response => {
                setForceRender({});
                alert(`Modelo ${item.marca.nombre} ${item.nombre}" recuperado con exito.`)
            })
            .catch(error => console.log(error))
    }

    const handleColumnButtonClick = (columnName) => {
        if (filterColumn) {
            if (columnName.toString() !== filterColumn.toString()) setFilterColumn(columnName);
            else setFilterColumn(null);
        } else setFilterColumn(columnName);
    }


    const filteredData = items.filter((item) => {
        if (filterColumn) {
            let valueToSearch;
            if (filterColumn.length === 1) valueToSearch = item[filterColumn[0]];
            if (filterColumn.length === 2) valueToSearch = item[filterColumn[0]][filterColumn[1]];
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
                            <button className={filterColumn && filterColumn.toString() === 'nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["nombre"])}>
                                Nombre
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'marca,nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["marca", "nombre"])}>
                                Marca
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
                            <td>{item.marca.nombre}</td>
                            <td className='action-box'>
                                <button className='action-button green' onClick={() => handleRecoverItem(item)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
