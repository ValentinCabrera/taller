import { useEffect, useState } from "react";
import { getTecnicosDeleted, postRecoverTecnico } from "../../Utils/Tecnico";

export default function TecnicoTablaEliminados(props) {
    const [items, setItems] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        getTecnicosDeleted().then(response => setItems(response));
    }, [forceRender]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState(null);

    function handleRecoverItem(item) {
        postRecoverTecnico(item.telefono)
            .then(response => {
                setForceRender({});
                alert(`El tecnico ${item.nombre} ${item.nombre} recuperada con exito.`)
            })
            .catch(error => console.log(error))
    }

    const handleColumnButtonClick = (columnName) => {
        if (columnName !== filterColumn) setFilterColumn(columnName);
        else setFilterColumn(null);
    }


    const filteredData = items.filter((item) => {
        if (filterColumn) {
            const valueToSearch = item[filterColumn];
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
                                <button className='action-button green' onClick={() => handleRecoverItem(item)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

};
