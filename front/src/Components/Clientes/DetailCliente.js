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
                    })
                    .catch(error => alert(`El numero de telefono ${telefono.value} ya esta registrado.`));

                telefono.value = "";
                nombre.value = "";
                apellido.value = "";
                direccion.value = "";
                mail.value = "";
                ultima_visita = "";

            } else alert("El telefono debe tener 10 digitos.")

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteCliente() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el cliente ${props.cliente.nombre} ${props.cliente.apellido}?`)

        if (resultado) (
            postDeleteCliente(props.cliente.telefono)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentCliente();
                })
                .catch(error => { console.log(error) })
        );
    }

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
                props.setCurrentCliente();
                telefono_input.value = "";
                nombre_input.value = "";
                apellido_input.value = "";
                mail_input.value = "";
                direccion_input.value = "";
                ultima_visita_input.value = "";
            })
            .catch(error => alert(`El cliente ${props.cliente.id} no se pudo modificar.`));
    };

    return (
        <div>
            <div>
                <p>Nombre: </p>
                <input id="nombre_cliente" type="text" placeholder={props.cliente ? props.cliente.nombre : "Valentin"} onChange={handleStringChange}></input>
            </div>
            <div>
                <p>Apellido: </p>
                <input id="apellido_cliente" type="text" placeholder={props.cliente ? props.cliente.apellido : "Cabrera"} onChange={handleStringChange}></input>
            </div>
            <div>
                <p>Telefono:</p>
                <input id="telefono_cliente" type="text" onChange={handleTelefonoChange} placeholder={props.cliente ? props.cliente.telefono : "3534192373"} />
            </div>
            <div>
                <p>Mail: </p>
                <input id="mail_cliente" type="text" placeholder={props.cliente ? props.cliente.mail : "ejemplo@dominio.com"} onChange={handleMailChange} />
            </div>
            <div>
                <p>Direccion: </p>
                <input id="direccion_cliente" type="text" placeholder={props.cliente ? props.cliente.direccion : "Barrio, calle, numero"} onChange={handleDireccionChange} />
            </div>
            {props.cliente && props.cliente.ultima_visita ?
                <div>
                    <p>Ultima visita: {props.cliente.ultima_visita.replace('T', ' ').slice(0, 16)}</p>
                    <input id="ultima_visita_cliente" type="datetime-local" max={maxDatetime} />
                </div> :
                <div>
                    <p>Ultima visita: </p>
                    <input id="ultima_visita_cliente" type="datetime-local" max={maxDatetime} />
                </div>
            }

            {props.cliente ?
                <div>
                    <button onClick={handleAlterCliente}><p>Modificar cliente</p></button>
                    <button onClick={handleDeleteCliente}><p>Eliminar cliente</p></button>
                </div>
                :
                <button onClick={handleNewCliente}><p>Crear cliente</p></button>
            }
        </div>
    );
}