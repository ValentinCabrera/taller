
import React, { useEffect, useState } from 'react';
import { getVehiculos, postDeleteVehiculo } from "../../Utils/Vehiculo";
import DetailVehiculo from "./DetailVehiculo";


export default function VehiculoTablActivos(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        getVehiculos().then(response => setItems(response));
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
        let resultado = window.confirm(`¿Está seguro que desea eliminar el vehiculo ${item.patente}?`)

        if (resultado) (
            postDeleteVehiculo(item.patente)
                .then(response => {
                    setForceRender({})
                    setCurrentItem();
                })
                .catch(error => { console.log(error) })
        );
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
                        <DetailVehiculo vehiculo={currentItem} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Vehiculos</h1>
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
