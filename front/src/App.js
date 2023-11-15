import { useState, useRef } from 'react';
import Clientes from './Components/Clientes/Clientes';
import Marcas from './Components/Marcas/Marcas';
import Modelos from './Components/Modelos/Modelos';
import Tecnicos from './Components/Tecnicos/Tecnicos';
import Vehiculos from './Components/Vehiculos/Vehiculos';
import Ordenes from './Components/Ordenes/Ordenes';
import Servicios from './Components/Servicios/Servicios';
import './Styles/App.css';
import './Styles/cliente.css';

import clienteIcon from './Static/navIcons/cliente.png';
import marcaIcon from './Static/navIcons/marca.png';
import modeloIcon from './Static/navIcons/modelo.png';
import ordenIcon from './Static/navIcons/orden.png';
import servicioIcon from './Static/navIcons/servicio.png';
import tecnicoIcon from './Static/navIcons/tecnico.png';
import vehiculoIcon from './Static/navIcons/vehiculo.png';

export default function App() {
  const [currentApp, setCurrentApp] = useState(<Vehiculos />);
  const [navOpen, setNavOpen] = useState(false);
  const timeoutRef = useRef(null)

  const secciones = [
    { componente: <Clientes />, largo: "Clientes", corto: <img src={clienteIcon} className='nav-icon' /> },
    { componente: <Marcas />, largo: "Marcas", corto: <img src={marcaIcon} className='nav-icon' /> },
    { componente: <Modelos />, largo: "Modelos", corto: <img src={modeloIcon} className='nav-icon' /> },
    { componente: <Ordenes />, largo: "Ordenes", corto: <img src={ordenIcon} className='nav-icon' /> },
    { componente: <Servicios />, largo: "Servicios", corto: <img src={servicioIcon} className='nav-icon' /> },
    { componente: <Tecnicos />, largo: "Tecnicos", corto: <img src={tecnicoIcon} className='nav-icon' /> },
    { componente: <Vehiculos />, largo: "Vehiculos", corto: <img src={vehiculoIcon} className='nav-icon' /> }
  ];

  return (
    <div className='app'>
      <div className='nav-div'
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setNavOpen(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setNavOpen(false), 400);
        }}
      >
        <div className={`nav-bar`}>
          <hr className='nav-sep' />
          {secciones.map(seccion => (
            <div
              className={currentApp.type === seccion.componente.type && "nav-selected"}
              onClick={() => setCurrentApp(seccion.componente)}
            >
              {navOpen ? seccion.largo : seccion.corto}
            </div>
          ))}
        </div>
      </div>
      <div className={`content`}>
        {currentApp}
      </div>
    </div >
  );
}
