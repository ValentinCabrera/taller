import { postDeleteCliente, getClientes } from '../../Utils/Cliente';
import DetailCliente from "./DetailCliente";
import CreateTable from '../Partials/CreateTable';

export default function ClienteTablActivos(props) {
    const { table, id, vocabulary, changeFrame } = props;
    return (
        <CreateTable
            fetchGet={getClientes}
            fetchDelete={postDeleteCliente}
            title="Clientes"
            DetailComponent={DetailCliente}
            changeFrame={changeFrame}
            id={id}
            table={table}
            vocabulary={vocabulary} />
    );
};