import { postDeleteMarca, postNewMarca } from "../../Utils/Marca";

export default function DetailMarca(props) {
    function handleNewMarca() {
        let nombre = document.getElementById("nombre_marca");

        if (nombre.value) {
            postNewMarca(nombre.value)
                .then(response => {
                    alert(`La marca ${nombre.value} se creo con exito.`);
                    props.setForceRender({});
                    props.handleSetModal();
                })
                .catch(error => alert(`La marca ${nombre.value} ya esta registrada.`));

        } else
            alert("Por favor, rellena todos los campos.");
    };

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
                {props.marca ?
                    <p className="detail-cliente-label">Nombre: {props.marca.nombre}</p>
                    :
                    <div>
                        <p className="detail-cliente-label">Nombre:</p>
                        <input className="detail-cliente-input" id="nombre_marca" type="text" placeholder="Jeep" onChange={handleStringChange} />
                    </div>
                }
            </div>

            {!props.marca &&
                <button className="detail-cliente-button" onClick={handleNewMarca}><p>Crear marca</p></button>
            }
        </div>
    );
}