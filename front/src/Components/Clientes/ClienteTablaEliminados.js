import React, { useEffect, useState } from 'react';
import { postRecoverCliente, getClientesDeleted } from '../../Utils/Cliente';

export default function ClienteTablEliminados(props) {
    const [clientes, setClientes] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getClientesDeleted().then(response => setClientes(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }

    const filteredData = clientes.filter((client) => {
        if (filterColumn) {
            const valueToSearch = client[filterColumn];
            return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return true;
        }
    });

    function handleRecoverCliente(cliente) {
        postRecoverCliente(cliente.telefono)
            .then(response => {
                setForceRender({});
                alert(`Cliente ${cliente.nombre} ${cliente.apellido} recuperado con exito.`);
            })
            .catch(error => alert(error));
    }

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
                            <button className={filterColumn === 'apellido' ? 'selected' : ''} onClick={() => handleColumnButtonClick('apellido')}>
                                Apellido
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn === 'mail' ? 'selected' : ''} onClick={() => handleColumnButtonClick('mail')}>
                                Email
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn === 'telefono' ? 'selected' : ''} onClick={() => handleColumnButtonClick('telefono')}>
                                Telefono
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn === 'direccion' ? 'selected' : ''} onClick={() => handleColumnButtonClick('direccion')}>
                                Direccion
                            </button>
                        </th>
                        <th>
                            <button className={filterColumn === 'ultima_visita' ? 'selected' : ''} onClick={() => handleColumnButtonClick('ultima_visita')}>
                                Ultima visita
                            </button>
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((client, index) => (
                        <tr key={index}>
                            <td>{client.nombre}</td>
                            <td>{client.apellido}</td>
                            <td>{client.mail}</td>
                            <td>{client.telefono}</td>
                            <td className="direccion-cell">{client.direccion}</td>
                            <td>{client.ultima_visita.replace('T', ' ').slice(0, 16)}</td>
                            <td className='action-box'>
                                <button className='action-button green' onClick={() => handleRecoverCliente(client)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
