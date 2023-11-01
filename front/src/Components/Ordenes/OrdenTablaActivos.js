
import React, { useEffect, useState } from 'react';
import { getOrdenes, getOrdenesDeleted, postDeleteOrden, postRecoverOrden } from "../../Utils/Orden";
import Listar from "../Listar";
import DetailOrden from "./DetailOrden";


export default function OrdenTablActivos(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        getOrdenes().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    const handleColumnButtonClick = (columnName) => {
        if (filterColumn) {
            if (columnName.toString() !== filterColumn.toString()) setFilterColumn(columnName);
            else setFilterColumn(null);
        } else setFilterColumn(columnName);
    }

    function handleDeleteItem(item) {
        let resultado = window.confirm(`¿Está seguro que desea eliminar la orden numero ${item.id}?`)

        if (resultado) (
            postDeleteOrden(item.id)
                .then(response => {
                    setForceRender({})
                    setCurrentItem();
                    alert(`La orden numero ${item.id} se elimino con exito.`)
                })
                .catch(error => { console.log(error) })
        );
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

    function handleSetModal(item) {
        if (!modal) {
            setCurrentItem(item);
            setModal(true);
        } else {
            setModal(false);
            setCurrentItem();
        };
    };

    return (
        <div>
            {modal &&
                <div class="modal-background">
                    <div class="modal-content h100 scroll">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailOrden orden={currentItem} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Ordenes</h1>
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
                                <button className='action-button red' onClick={() => handleDeleteItem(item)}>-</button>
                                <button className='action-button green' onClick={() => handleSetModal(item)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
