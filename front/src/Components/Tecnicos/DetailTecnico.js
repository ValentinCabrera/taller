import { postNewTecnico, postDeleteTecnico } from "../../Utils/Tecnico";

export default function DetailTecnico(props) {
    function handleNewTecnico() {
        let telefono = document.getElementById("telefono").value;
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;

        if (telefono && nombre && apellido) {
            if (telefono.length === 10) {
                postNewTecnico(nombre, apellido, telefono)
                    .then(response => {
                        alert(`El tecnivo ${nombre} ${apellido} se creo con exito.`);
                        props.setForceRender({});
                    })
                    .catch(error => alert(`El numero de telefono ${telefono} ya esta registrado.`));

                const inputs = document.querySelectorAll("input");
                inputs.forEach(input => {
                    input.value = "";
                });

            } else alert("El telefono debe tener 10 digitos.")

        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteTecnico() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el tecnico ${props.tecnico.nombre} ${props.tecnico.apellido}?`)

        if (resultado) (
            postDeleteTecnico(props.tecnico.telefono)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentTecnico();
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
                <input id="nombre" type="text" placeholder="Valentin" onChange={handleStringChange}></input>
            </div>
            <div>
                <p>Apellido: </p>
                <input id="apellido" type="text" placeholder="Cabrera" onChange={handleStringChange}></input>
            </div>
            <div>
                <p>Telefono:</p>
                <input id="telefono" type="text" onChange={handleTelefonoChange} placeholder="3534192373" />
            </div>

            {props.tecnico ?
                <div>
                    <button><p>Modificar tecnico</p></button>
                    <button onClick={handleDeleteTecnico}><p>Eliminar tecnico</p></button>
                </div>
                :
                <button onClick={handleNewTecnico}><p>Crear tecnico</p></button>
            }
        </div>
    );
}