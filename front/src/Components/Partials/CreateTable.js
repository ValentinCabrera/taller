import React, { useEffect, useState } from 'react';
import editIcon from '../../Static/edit.png';
import deleteIcon from '../../Static/delete.png';
import Table from './Table';

export default function CreateTable(props) {
    const { fetchGet, fetchDelete, title, DetailComponent, table, changeFrame, vocabulary, id } = props;

    const [forceRender, setForceRender] = useState({})
    const [items, setItems] = useState([])
    const [modal, setModal] = useState();
    const [currentItem, setCurrentItem] = useState();

    useEffect(() => {
        fetchGet().then(response => setItems(response));
    }, [forceRender])

    const accionModificar = {
        component: <img src={editIcon} alt="Editar" />,
        className: "action-button edit-button",
        funcion: handleSetModal
    }

    const accionEliminar = {
        component: <img src={deleteIcon} alt="Editar" />,
        className: "action-button delete-button",
        funcion: handleDeleteItem
    }

    function ModalButton() {
        return <button className='head-button' onClick={() => setModal(true)}>Crear</button>
    };

    function Modal() {
        return (
            <div class="modal-background">
                <div class="modal-content h100 scroll">
                    <div className='row w100'>
                        <button className='modal-close-button' onClick={handleSetModal}>Volver</button>
                    </div>
                    <DetailComponent item={currentItem} />
                </div>
            </div>
        );
    };

    return <Table
        items={items}
        title={title}
        changeFrame={changeFrame}
        acciones={[accionModificar, accionEliminar]}
        table={table}
        modalState={modal}
        Modal={Modal}
        ModalButton={ModalButton}
    />

    function handleDeleteItem(item) {
        let resultado = window.confirm(`¿Está seguro que deseas eliminar ${vocabulary.pronombre} ${vocabulary.singular} con ${vocabulary.id} ${item[vocabulary.id]}?`)
        if (resultado) (
            fetchDelete(item[id])
                .then(response => {
                    setForceRender({})
                    setCurrentItem();
                    alert(`Se elimino exitosamente ${vocabulary.pronombre} ${vocabulary.singular} con ${vocabulary.id} ${item[vocabulary.id]}.`)
                })
                .catch(error => { console.log(error) })
        );
    }

    function handleSetModal(item) {
        if (!modal) {
            setCurrentItem(item);
            setModal(true);
        } else {
            setModal(false);
            setCurrentItem();
        };
    };
};

