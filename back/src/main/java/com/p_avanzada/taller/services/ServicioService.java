package com.p_avanzada.taller.services;

import com.p_avanzada.taller.models.Servicio;
import com.p_avanzada.taller.models.Vehiculo;
import com.p_avanzada.taller.repositories.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class ServicioService {
    private final ServicioRepository servicioRepository;

    @Autowired
    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> getAll() {
        List<Servicio> servicios = servicioRepository.findAllActive();
        return servicios;
    }

    public Optional<Servicio> getByName(String nombre) {
        return servicioRepository.findByNombre(nombre);
    }

    public List<Servicio> getAllDeleted() {
        List<Servicio> servicios = servicioRepository.findAllDeleted();
        return servicios;
    }

    public Servicio save(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio recoverServicio(Servicio recoverServicio) {
        Optional<Servicio> optionalServicio = getByName(recoverServicio.getNombre());

        Servicio servicio = optionalServicio.get();
        servicio.recover();
        save(servicio);

        return servicio;
    }

    public void delete(Servicio deleteServicio) {
        Optional<Servicio> optionalServicio = getByName(deleteServicio.getNombre());

        if (optionalServicio.isPresent()) {
            Servicio servicio = optionalServicio.get();
            servicio.delete();
            save(servicio);
        }
    }

    public Optional<Servicio> newServicio(Servicio servicio) {
        Optional<Servicio> serOptional = getByName(servicio.getNombre());
        if (serOptional.isPresent())
            return Optional.empty();
        else {
            Servicio newServicio = servicioRepository.save(servicio);
            return Optional.of(newServicio);
        }
    }
}