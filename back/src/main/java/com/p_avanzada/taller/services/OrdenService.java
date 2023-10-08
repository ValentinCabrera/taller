package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.OrdenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.p_avanzada.taller.models.Orden;

import java.util.Optional;

@Service
public class OrdenService {

    private final OrdenRepository ordenRepository;

    @Autowired
    public OrdenService(OrdenRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    public List<Orden> getAll() {
            List<Orden> Ordens = ordenRepository.findAll();
            return Ordens;
    }

    public Optional<Orden> getById(Long id) {
        return ordenRepository.findById(id);
    }

    public Orden save(Orden Orden) {
            return ordenRepository.save(Orden);
    }

    public void delete(Orden Orden) {
            Orden.delete();
            save(Orden);
    }

    public Orden alter(Orden alterOrden) {
        Long cliente_id = alterOrden.getIdCliente();
        Long id_vehiculo = alterOrden.getIdVehiculo();
        String servicio = alterOrden.getServicio();
        String informacion_adicional = alterOrden.getInformacion();

        Optional<Orden> optionalOrden = getById(alterOrden.getId());

        if (optionalOrden.isPresent()) {
            Orden Orden = optionalOrden.get();

            if (cliente_id != null)
                Orden.setIdCliente(cliente_id);

            if (id_vehiculo != null)
                Orden.setIdVehiculo(cliente_id);
                
            if (servicio != null)
                Orden.setServicio(servicio);

            if (informacion_adicional != null)
                Orden.setInformacion(informacion_adicional);
            
            return ordenRepository.save(Orden);
        }

        return alterOrden;
    }
}