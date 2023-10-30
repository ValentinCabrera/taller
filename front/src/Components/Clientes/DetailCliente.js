import { postDeleteCliente, postNewCliente } from "../../Utils/Cliente";

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
            } else if (!/^([A-Z]*[a-z]*)*$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1)
        }
    }

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
                <input id="mail_cliente" type="mail" placeholder={props.cliente ? props.cliente.mail : "ejemplo@dominio.com"} />
            </div>
            <div>
                <p>Direccion: </p>
                <input id="direccion_cliente" type="text" placeholder={props.cliente ? props.cliente.direccion : "Barrio, calle, numero"} />
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
                    <button><p>Modificar cliente</p></button>
                    <button onClick={handleDeleteCliente}><p>Eliminar cliente</p></button>
                </div>
                :
                <button onClick={handleNewCliente}><p>Crear cliente</p></button>
            }
        </div>
    );
}