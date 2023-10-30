import React, { useEffect, useState } from 'react';
import { postDeleteCliente, getClientes } from '../../Utils/Cliente';
import DetailCliente from "./DetailCliente";

export default function ClienteTablActivos(props) {
    const [clientes, setClientes] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentCliente, setCurrentCliente] = useState();

    useEffect(() => {
        getClientes().then(response => setClientes(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }

    function handleDeleteCliente(client) {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el cliente ${client.nombre} ${client.apellido}?`)

        if (resultado) (
            postDeleteCliente(client.telefono)
                .then(response => {
                    setForceRender({});
                    alert(`El cliente ${client.nombre} ${client.apellido} fue eliminado con exito.`)
                })
                .catch(error => { alert(`El cliente ${client.nombre} ${client.apellido} no se pudo eliminar.`) })
        );
    }

    const filteredData = clientes.filter((client) => {
        if (filterColumn) {
            const valueToSearch = client[filterColumn];
            return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return true;
        }
    });

    function handleSetModal(cliente) {
        if (!modal) {
            setCurrentCliente(cliente);
            setModal(true);
        } else {
            setModal(false);
            setCurrentCliente();
        };
    };

    return (
        <div>
            {modal &&
                <div class="modal-background">
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailCliente cliente={currentCliente} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Clientes</h1>
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
                    <button className='head-button' onClick={() => setModal(true)}>Crear</button>
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
                                <button className='action-button red' onClick={() => handleDeleteCliente(client)}>-</button>
                                <button className='action-button green' onClick={() => handleSetModal(client)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
