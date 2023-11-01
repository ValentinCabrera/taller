import { useEffect, useState } from "react";
import { getTecnicos, postDeleteTecnico } from "../../Utils/Tecnico";
import DetailTecnico from "./DetailTecnico";

export default function TecnicoTablaActivos(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        getTecnicos().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }

    function handleDeleteItem(item) {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el tecnico ${item.nombre} ${item.apellido}?`)

        if (resultado) (
            postDeleteTecnico(item.telefono)
                .then(response => {
                    setForceRender({})
                    setCurrentItem();
                    alert(`El tecnico ${item.nombre} ${item.apellido} se elimino con exito.`)
                })
                .catch(error => alert(`Error al eliminar el tecnico ${item.nombre} ${item.apellido}.`))
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
                        <DetailTecnico tecnico={currentItem} setForceRender={setForceRender} handleSetModal={handleSetModal} />
                    </div>
                </div>
            }

            <div className='head-table'>
                <div className='row row-line'>
                    <h1>Tecnicos</h1>
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
                            <button className={filterColumn === 'telefono' ? 'selected' : ''} onClick={() => handleColumnButtonClick('telefono')}>
                                Telefono
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
                            <td>{item.apellido}</td>
                            <td>{item.telefono}</td>
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
