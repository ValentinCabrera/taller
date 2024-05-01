import DetailMarca from './DetailMarca';
import { getMarcas, postDeleteMarca } from "../../Utils/Marca";
import CreateTable from '../Partials/CreateTable';
import React, { useState } from 'react'; // Importa useState de React

export default function MarcaTablaActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    const [forceRender, setForceRender] = useState({}); // Define setForceRender utilizando useState

    return (
        <CreateTable
            fetchGet={getMarcas}
            fetchDelete={postDeleteMarca}
            title="Marcas"
            DetailComponent={DetailMarca}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary}
            setForceRender={setForceRender}
        />
    );
};