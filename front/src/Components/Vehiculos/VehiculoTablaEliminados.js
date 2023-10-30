
import React, { useEffect, useState } from 'react';
import { getVehiculosDeleted, postRecoverVehiculo } from "../../Utils/Vehiculo";


export default function VehiculoTablaEliminados(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getVehiculosDeleted().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    function handleRecoverItem(item) {
        postRecoverVehiculo(item.patente)
            .then(response => {
                setForceRender({});
                alert(`El vehiculo ${item.patente} recuperado con exito.`)
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
            if (filterColumn.length === 3) valueToSearch = item[filterColumn[0]][filterColumn[1]][filterColumn[2]];
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
                            <button className={filterColumn && filterColumn.toString() === 'patente' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["patente"])}>
                                Patente
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'año' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["año"])}>
                                Año
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'modelo,nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["modelo", "nombre"])}>
                                Modelo
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'modelo,marca,nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["modelo", "marca", "nombre"])}>
                                Marca
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'cliente,nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["cliente", "nombre"])}>
                                Cliente nombre
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'cliente,apellido' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["cliente", "apellido"])}>
                                Cliente apellido
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
                            <td>{item.patente}</td>
                            <td>{item.año}</td>
                            <td>{item.modelo.nombre}</td>
                            <td>{item.modelo.marca.nombre}</td>
                            <td>{item.cliente.nombre}</td>
                            <td>{item.cliente.apellido}</td>
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
