import React, { useEffect, useState } from 'react';

export default function Table(props) {
    const { items, title, table, changeFrame, acciones, modalState, ModalButton, Modal } = props;

    useEffect(() => { }, [items]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState([]);

    const handleColumnButtonClick = (columnName) => {
        if (filterColumn.includes(columnName)) {
            let newFilterColumn = filterColumn.filter(filtro => filtro !== columnName);
            setFilterColumn(newFilterColumn);
        } else {
            let newFilterColumn = [...filterColumn, columnName];
            setFilterColumn(newFilterColumn);
        }
    }

    const filteredData = items.filter((item) => {
        if (filterColumn.length > 0) {
            for (let i of filterColumn) {
                let valueToSearch = item;

                for (let j of i) {
                    if (valueToSearch instanceof Array) {
                        for (let k of valueToSearch) {
                            if (k[j].toString().toLowerCase().includes(searchTerm.toLowerCase())) return true
                        }
                        break
                    }
                    valueToSearch = valueToSearch[j];
                }

                if (valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase())) return true;
            } return false;
        } else return true;

    });

    function getAtributte(item, index) {
        for (let i of index) {
            if (item instanceof Array) {
                let array = [];
                for (let j of item) array.push(j[i]);
                return (
                    <select>
                        {array.map(option => (
                            <option>{option}</option>
                        ))}
                    </select>
                );
            }

            item = item[i];
        }
        return item;
    }

    return (
        <div>
            {modalState && Modal && <Modal />}
            <div className='head-table'>
                <div className='row row-line'>
                    <h1>{title}</h1>
                    {changeFrame}
                </div>
                <div className='row'>
                    <input
                        type="search"
                        placeholder="Buscar..."
                        value={searchTerm}
                        className='finder'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {ModalButton && <ModalButton />}
                </div>
            </div>
            <table className="cliente-table">
                <thead>
                    <tr>
                        {table.map(group => (
                            <th>
                                <button className={filterColumn && filterColumn.includes(group.filter) ? 'selected' : ''} onClick={() => handleColumnButtonClick(group.filter)}>
                                    {group.column}
                                </button>
                            </th>
                        ))}
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            {table.map(group => <td>{getAtributte(item, group.row)}</td>)}
                            <td className='action-box'>
                                {acciones.map(accion => (
                                    <button className={accion.className} onClick={() => accion.funcion(item)}>
                                        {accion.component}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

