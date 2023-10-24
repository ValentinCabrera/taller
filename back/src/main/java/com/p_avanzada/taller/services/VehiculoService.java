package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.VehiculoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.p_avanzada.taller.models.Vehiculo;

@Service
public class VehiculoService {
    private final VehiculoRepository vehiculoRepository;

    @Autowired
    public VehiculoService(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    public List<Vehiculo> getAll() {
        List<Vehiculo> vehiculos = vehiculoRepository.findAllActive();
        return vehiculos;
    }

    public Vehiculo recoverVehiculo(Vehiculo recoverVehiculo) {
        Optional<Vehiculo> optionalVehiculo = getByPatente(recoverVehiculo.getPatente());

        Vehiculo vehiculo = optionalVehiculo.get();
        vehiculo.recover();
        save(vehiculo);

        return vehiculo;
    }

    public Optional<Vehiculo> getByPatente(String patente) {
        return vehiculoRepository.findByPatente(patente);
    }

    public List<Vehiculo> getAllDeleted() {
        List<Vehiculo> vehiculos = vehiculoRepository.findAllDeleted();
        return vehiculos;
    }

    public Vehiculo save(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public void delete(Vehiculo vehiculo) {
        Optional<Vehiculo> vehiculoOptional = getByPatente(vehiculo.getPatente());

        if (vehiculoOptional.isPresent()) {
            vehiculoOptional.get().delete();
            save(vehiculoOptional.get());
        }
    }

    public Optional<Vehiculo> newVehiculo(Vehiculo vehiculo) {
        Optional<Vehiculo> vehiculoOptional = getByPatente(vehiculo.getPatente());
        if (vehiculoOptional.isPresent())
            return Optional.empty();
        else {
            Vehiculo nuevoVehiculo = vehiculoRepository.save(vehiculo);
            return Optional.of(nuevoVehiculo);
        }
    }
}