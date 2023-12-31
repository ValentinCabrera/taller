import { postNewTecnico, postDeleteTecnico, postAlterTecnico } from "../../Utils/Tecnico";

export default function DetailTecnico(props) {
    function handleNewTecnico() {
        let telefono = document.getElementById("telefono_tecnico").value;
        let nombre = document.getElementById("nombre_tecnico").value;
        let apellido = document.getElementById("apellido_tecnico").value;

        if (telefono && nombre && apellido) {
            if (telefono.length === 10) {
                postNewTecnico(nombre, apellido, telefono)
                    .then(response => {
                        alert(`El tecnivo ${nombre} ${apellido} se creo con exito.`);
                        props.setForceRender({});
                        props.handleSetModal();
                    })
                    .catch(error => alert(`El numero de telefono ${telefono} ya esta registrado.`));

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

    function handleAlterTecnico() {
        let telefono = props.tecnico.telefono;
        let nombre = props.tecnico.nombre;
        let apellido = props.tecnico.apellido;

        let telefono_input = document.getElementById("telefono_tecnico");
        let nombre_input = document.getElementById("nombre_tecnico");
        let apellido_input = document.getElementById("apellido_tecnico");

        if (telefono_input.value) {
            if (telefono_input.value.length === 10) telefono = telefono_input.value;
            else return alert("El telefono debe tener 10 digitos.")
        }

        if (nombre_input.value) nombre = nombre_input.value;
        if (apellido_input.value) apellido = apellido_input.value;

        postAlterTecnico({ id: props.tecnico.id, nombre: nombre, apellido: apellido, telefono: telefono })
            .then(response => {
                alert(`El tecnico ${props.tecnico.id} se modifico con exito.`);
                props.setForceRender({});
                props.handleSetModal();
            })
            .catch(error => alert(`El tecnico ${props.tecnico.id} no se pudo modificar.`));
    };

    return (
        <div>
            <div>
                <p className="detail-cliente-label">Nombre: </p>
                <input className="detail-cliente-input" id="nombre_tecnico" type="text" placeholder={props.tecnico ? props.tecnico.nombre : "Valentin"} onChange={handleStringChange}></input>
            </div>
            <div>
                <p className="detail-cliente-label">Apellido: </p>
                <input className="detail-cliente-input" id="apellido_tecnico" type="text" placeholder={props.tecnico ? props.tecnico.apellido : "Cabrera"} onChange={handleStringChange}></input>
            </div>
            <div>
                <p className="detail-cliente-label">Telefono:</p>
                <input className="detail-cliente-input" id="telefono_tecnico" type="text" onChange={handleTelefonoChange} placeholder={props.tecnico ? props.tecnico.telefono : "3534192373"} />
            </div>

            {props.tecnico ?
                <div>
                    <button className="detail-cliente-button" onClick={handleAlterTecnico}><p>Modificar tecnico</p></button>
                </div>
                :
                <button className="detail-cliente-button" onClick={handleNewTecnico}><p>Crear tecnico</p></button>
            }
        </div>
    );
}