import { postNewCliente } from "../../Utils/Fetchs";

export default function NewCliente(props) {
    function newCliente() {
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let telefono = document.getElementById("telefono");

        if (nombre.value && apellido.value && telefono.value) {
            postNewCliente(nombre.value, apellido.value, telefono.value)
                .then(response => {
                    props.updateData();
                })
            nombre.value = apellido.value = telefono.value = "";
        } else
            alert("Por favor, rellena todos los campos");
    };


    function handleTelChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (!/^\d*$/.test(e.target.value) || e.target.value.length >= 10) e.target.value = e.target.value.slice(0, -1)
        }
    }
    return (
        <div className="form">
            <h2>Crear cliente</h2>
            <input id="nombre" type="text" placeholder="Nombre" />
            <input id="apellido" type="text" placeholder="Apellido" />
            <input id="telefono" onChange={handleTelChange} type="text" placeholder="Telefono" />
            <button onClick={newCliente}>Guardar Cliente</button>
        </div>
    );

}