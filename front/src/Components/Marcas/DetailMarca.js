import { postDeleteMarca, postNewMarca } from "../../Utils/Marca";

export default function DetailMarca(props) {
    function handleNewMarca() {
        let nombre = document.getElementById("nombre_marca");

        if (nombre.value) {
            postNewMarca(nombre.value)
                .then(response => {
                    alert(`La marca ${nombre.value} se creo con exito.`);
                    props.setForceRender({});
                })
                .catch(error => alert(`La marca ${nombre.value} ya esta registrada.`));

            nombre.value = "";


        } else
            alert("Por favor, rellena todos los campos.");
    };

    function handleDeleteMarca() {
        let resultado = window.confirm(`¿Está seguro que desea eliminar la marca ${props.marca.nombre}?`)

        if (resultado) (
            postDeleteMarca(props.marca.nombre)
                .then(response => {
                    props.setForceRender({})
                    props.setCurrentMarca();
                })
                .catch(error => { console.log(error) })
        );
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
                <input id="nombre_marca" type="text" placeholder={props.marca ? props.marca.nombre : "Jeep"} onChange={handleStringChange}></input>
            </div>

            {props.marca ?
                <div>
                    <button><p>Modificar marca</p></button>
                    <button onClick={handleDeleteMarca}><p>Eliminar marca</p></button>
                </div>
                :
                <button onClick={handleNewMarca}><p>Crear marca</p></button>
            }
        </div>
    );
}