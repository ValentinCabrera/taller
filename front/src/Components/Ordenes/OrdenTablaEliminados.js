
import React, { useEffect, useState } from 'react';
import { getOrdenes, getOrdenesDeleted, postDeleteOrden, postRecoverOrden } from "../../Utils/Orden";

export default function OrdenTablaEliminados(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getOrdenesDeleted().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    function handleRecoverItem(item) {
        postRecoverOrden(item.id)
            .then(response => {
                setForceRender({});
                alert(`La orden numero ${item.id} fue recuperada con exito.`)
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
                            <button className={filterColumn && filterColumn.toString() === 'vehiculo,patente' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["vehiculo", "patente"])}>
                                Vehiculo
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'cliente,nombre' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["cliente", "nombre"])}>
                                Nombre cliente
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn && filterColumn.toString() === 'cliente,apellido' ? 'selected' : ''} onClick={() => handleColumnButtonClick(["cliente", "apellido"])}>
                                Apellido cliente
                            </button>
                        </th>
                        <th>
                            <p>Servicios</p>
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.vehiculo.patente}</td>
                            <td>{item.cliente.nombre}</td>
                            <td>{item.cliente.apellido}</td>
                            <td>
                                <select className='cliente-table-select'>
                                    {item.servicios.map(servicio => (
                                        <option value={servicio.nombre}>{servicio.nombre}</option>
                                    ))}
                                </select>
                            </td>
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
