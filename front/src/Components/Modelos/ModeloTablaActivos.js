
import React, { useEffect, useState } from 'react';
import { getModelos, postDeleteModelo } from "../../Utils/Modelo";
import DetailModelo from "./DetailModelo";


export default function ModeloTablActivos(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        getModelos().then(response => setItems(response));
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
        let resultado = window.confirm(`¿Está seguro que desea eliminar el modelo ${item.marca.nombre} ${item.nombre}?`)

        if (resultado) (
            postDeleteModelo(item.id)
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
                    <div class="modal-content">
                        <div className='row w100'>
                            <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                        </div>
                        <DetailModelo modelo={currentItem} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Modelos</h1>
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
