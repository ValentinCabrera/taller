package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.OrdenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.p_avanzada.taller.models.Orden;

@Service
public class OrdenService {
    private final OrdenRepository ordenRepository;

    @Autowired
    public OrdenService(OrdenRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    public List<Orden> getAll() {
        List<Orden> ordenes = ordenRepository.findAllActive();
        return ordenes;
    }

    public Orden recoverOrden(Orden recoverOrden) {
        Optional<Orden> optionalOrden = getById(recoverOrden.getId());

        Orden orden = optionalOrden.get();
        orden.recover();
        save(orden);

        return orden;
    }

    public Optional<Orden> getById(Long id) {
        return ordenRepository.findById(id);
    }

    public List<Orden> getAllDeleted() {
        List<Orden> ordenes = ordenRepository.findAllDeleted();
        return ordenes;
    }

    public Orden save(Orden orden) {
        return ordenRepository.save(orden);
    }

    public void delete(Orden orden) {
        Optional<Orden> optionalOrden = getById(orden.getId());

        if (optionalOrden.isPresent()) {
            optionalOrden.get().delete();
            save(optionalOrden.get());
        }
    }

    public Orden newOrden(Orden orden) {
        ordenRepository.save(orden);
        return orden;
    }
}