import { useEffect, useState } from "react";

export default function Select(props) {
    const [filterData, setFilterData] = useState();

    useEffect(() => {
        if (props.data) setFilterData(props.data);
    }, [props.data])

    function handleFilter(e) {
        let filtro = e.target.value;
        let regex = new RegExp(`^.*${filtro}.*$`);
        let filtrada = props.data.filter(item => regex.test(item[props.itemName]));

        setFilterData(filtrada);
    };

    return (
        <div className="listado">
            <input type="text" placeholder="Buscar" onChange={handleFilter}></input>

            <div style={{ overflow: 'scroll', height: 300 }}>
                {filterData && filterData.map(item => (
                    <div key={item[props.itemKey]} onClick={() => props.setCurrentItem(item)} className="entidad">
                        <p>{item[props.itemName]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}   