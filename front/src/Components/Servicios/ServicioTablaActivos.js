import React, { useEffect, useState } from 'react';
import { getServicios, postDeleteServicio } from "../../Utils/Servicio";
import DetailServicio from './DetailServicio';



export default function ModelosTablActivos(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        getServicios().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }

    function handleDeleteItem(item) {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el servicio "${item.nombre}"?`)

        if (resultado) (
            postDeleteServicio(item.nombre)
                .then(response => {
                    setForceRender({})
                    setCurrentItem();
                    alert(`El servicio "${item.nombre}" se elimino con exito.`)
                })
                .catch(error => { console.log(error) })
        );
    }

    const filteredData = items.filter((item) => {
        if (filterColumn) {
            const valueToSearch = item[filterColumn];
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
                        <DetailServicio servicio={currentItem} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Servicios</h1>
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
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nombre}</td>
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
