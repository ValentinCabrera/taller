import React, { useEffect, useState } from 'react';
import backIcon from '../../Static/back.png';
import Table from './Table';

export default function RecoverTable(props) {
    const { recoverFetch, table, changeFrame, vocabulary, id, fetchGet } = props;

    const [forceRender, setForceRender] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchGet().then(response => setItems(response));
    }, [forceRender])

    return (<Table
        items={items}
        title={"Eliminados"}
        changeFrame={changeFrame}
        acciones={[{
            component: <img src={backIcon} alt="Editar" />,
            className: "action-button back-button",
            funcion: handleRecoverItem
        }]}
        table={table} />)

    function handleRecoverItem(item) {
        recoverFetch(item[id])
            .then(response => {
                setForceRender({});
                alert(`Se recupero exitosamente ${vocabulary.pronombre} ${vocabulary.singular} con ${vocabulary.id} ${item[vocabulary.id]}.`)
            })
            .catch(error => console.log(error))
    }
};

