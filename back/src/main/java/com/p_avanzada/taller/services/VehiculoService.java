package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.VehiculoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.p_avanzada.taller.models.Vehiculo;

import java.util.Optional;

@Service
public class VehiculoService {
    private final VehiculoRepository vehiculoRepository;

    @Autowired
    public VehiculoService(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    public List<Vehiculo> getAll() {
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();
        return vehiculos;
    }

    public Optional<Vehiculo> getById(String id) {
        return vehiculoRepository.findById(id);
    }

    public Vehiculo save(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public void delete(Vehiculo vehiculo) {
        vehiculo.delete();
        save(vehiculo);
    }
}