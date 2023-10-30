import { postAlterCliente, postDeleteCliente, postNewCliente } from "../../Utils/Cliente";

export default function DetailCliente(props) {
    var now = new Date();
    var localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    var maxDatetime = localDatetime.toISOString().slice(0, 16);

    function handleNewCliente() {
        let telefono = document.getElementById("telefono_cliente");
        let nombre = document.getElementById("nombre_cliente");
        let apellido = document.getElementById("apellido_cliente");
        let mail = document.getElementById("mail_cliente");
        let direccion = document.getElementById("direccion_cliente");
        let ultima_visita = document.getElementById("ultima_visita_cliente");

        if (telefono.value && nombre.value && apellido.value && direccion.value && mail.value && ultima_visita.value) {
            if (telefono.value.length === 10) {

                postNewCliente(nombre.value, apellido.value, telefono.value, direccion.value, mail.value, ultima_visita.value)
                    .then(response => {
                        alert(`El cliente ${nombre.value} ${apellido.value} se creo con exito.`);
                        props.setForceRender({});
                        telefono.value = "";
                        nombre.value = "";
                        apellido.value = "";
                        direccion.value = "";
                        mail.value = "";
                        ultima_visita = "";
                    })
                    .catch(error => alert(`El numero de telefono ${telefono.value} ya esta registrado.`));

            } else alert("El telefono debe tener 10 digitos.")

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleTelefonoChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (!/^\d*$/.test(e.target.value) || e.target.value.length > 10) e.target.value = e.target.value.slice(0, -1)
        }
    }

    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z-]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    function handleDireccionChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z0-9,]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    function handleMailChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (!/^([a-zA-Z0-9._%+-]+|[a-zA-Z0-9._%+-]+@|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,})$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    function handleAlterCliente() {
        let telefono = props.cliente.telefono;
        let nombre = props.cliente.nombre;
        let apellido = props.cliente.apellido;
        let mail = props.cliente.mail;
        let direccion = props.cliente.direccion;
        let ultima_visita = props.cliente.ultima_visita;

        let telefono_input = document.getElementById("telefono_cliente");
        let nombre_input = document.getElementById("nombre_cliente");
        let apellido_input = document.getElementById("apellido_cliente");
        let mail_input = document.getElementById("mail_cliente");
        let direccion_input = document.getElementById("direccion_cliente");
        let ultima_visita_input = document.getElementById("ultima_visita_cliente");

        if (telefono_input.value) {
            if (telefono_input.value.length === 10) telefono = telefono_input.value;
            else return alert("El telefono debe tener 10 digitos.")
        }

        if (nombre_input.value) nombre = nombre_input.value;
        if (apellido_input.value) apellido = apellido_input.value;
        if (mail_input.value) mail = mail_input.value;
        if (direccion_input.value) direccion = direccion_input.value;
        if (ultima_visita_input.value) ultima_visita = ultima_visita_input.value;

        postAlterCliente({ id: props.cliente.id, nombre: nombre, apellido: apellido, telefono: telefono, mail: mail, direccion: direccion, ultima_visita: ultima_visita })
            .then(response => {
                alert(`El cliente ${props.cliente.id} se modifico con exito.`);
                props.setForceRender({});
                props.handleSetModal();
            })
            .catch(error => alert(`El cliente ${props.cliente.id} no se pudo modificar.`));
    };

    return (
        <div className="detail-cliente-container">
            <div>
                <label className="detail-cliente-label">Nombre: </label>
                <input
                    id="nombre_cliente"
                    type="text"
                    placeholder={props.cliente ? props.cliente.nombre : "Valentin"}
                    className="detail-cliente-input"
                    onChange={handleStringChange}
                />
            </div>
            <div>
                <label className="detail-cliente-label">Apellido: </label>
                <input
                    id="apellido_cliente"
                    type="text"
                    placeholder={props.cliente ? props.cliente.apellido : "Cabrera"}
                    className="detail-cliente-input"
                    onChange={handleStringChange}
                />
            </div>
            <div>
                <label className="detail-cliente-label">Telefono:</label>
                <input
                    id="telefono_cliente"
                    type="text"
                    onChange={handleTelefonoChange}
                    placeholder={props.cliente ? props.cliente.telefono : "3534192373"}
                    className="detail-cliente-input"
                />
            </div>
            <div>
                <label className="detail-cliente-label">Mail: </label>
                <input
                    id="mail_cliente"
                    type="text"
                    placeholder={props.cliente ? props.cliente.mail : "ejemplo@dominio.com"}
                    onChange={handleMailChange}
                    className="detail-cliente-input"
                />
            </div>
            <div>
                <label className="detail-cliente-label">Direccion: </label>
                <input
                    id="direccion_cliente"
                    type="text"
                    placeholder={props.cliente ? props.cliente.direccion : "Barrio, calle, numero"}
                    onChange={handleDireccionChange}
                    className="detail-cliente-input"
                />
            </div>
            {props.cliente && props.cliente.ultima_visita ? (
                <div>
                    <div>
                        <label className="detail-cliente-label">Ultima visita:</label>
                    </div>
                    <div>
                        <label className="detail-cliente-label">{props.cliente.ultima_visita.replace('T', ' ').slice(0, 16)}</label>
                        <input id="ultima_visita_cliente" type="datetime-local" max={maxDatetime} className="detail-cliente-input" />
                    </div>
                </div>
            ) : (
                <div>
                    <label className="detail-cliente-label">Ultima visita: </label>
                    <input id="ultima_visita_cliente" type="datetime-local" max={maxDatetime} className="detail-cliente-input" />
                </div>
            )}

            {props.cliente ? (
                <button className="detail-cliente-button" onClick={handleAlterCliente}>
                    <p>Modificar cliente</p>
                </button>
            ) : (
                <button className="detail-cliente-button" onClick={handleNewCliente}>
                    <p>Crear cliente</p>
                </button>
            )}
        </div>
    );
}