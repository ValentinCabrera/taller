import { postDeleteServicio, postNewServicio } from "../../Utils/Servicio";

export default function DetailServicio(props) {
    function handleNewServicio() {
        let nombre = document.getElementById("nombre_servicio");

        if (nombre.value) {
            postNewServicio(nombre.value)
                .then(response => {
                    alert(`El servicio ${nombre.value} se creo con exito.`);
                    props.setForceRender({});
                })
                .catch(error => alert(`El servicio ${nombre.value} ya esta registrado.`));

            nombre.value = "";


        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteServicio() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar el servicio ${props.servicio.nombre}?`)

        if (resultado) (
            postDeleteServicio(props.servicio.nombre)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentServicio();
                })
                .catch(error => { console.log(error) })
        );
    }

    function handleStringChange(e) {
        if (!(e.nativeEvent.inputType === "deleteContentBackward")) {
            if (e.target.value.length === 1) {
                e.target.value = e.target.value.toUpperCase();
                if (!/^[A-Z]{1}$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
            } else if (!/^([A-Z](([A-Za-z-]+)\s{0,1})*)$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
        }
    }

    return (
        <div>
            <div>
                <p>Nombre: </p>
                <input id="nombre_servicio" type="text" placeholder={props.servicio ? props.servicio.nombre : "Lavar el auto"} onChange={handleStringChange}></input>
            </div>

            {props.servicio ?
                <div>
                    <button><p>Modificar servicio</p></button>
                    <button onClick={handleDeleteServicio}><p>Eliminar servicio</p></button>
                </div>
                :
                <button onClick={handleNewServicio}><p>Crear servicio</p></button>
            }
        </div>
    );
}