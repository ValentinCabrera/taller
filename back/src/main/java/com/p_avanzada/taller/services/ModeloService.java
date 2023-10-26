package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.ModeloRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.p_avanzada.taller.models.Modelo;

import java.util.Optional;

@Service
public class ModeloService {
    private final ModeloRepository modeloRepository;

    @Autowired
    public ModeloService(ModeloRepository modeloRepository) {
        this.modeloRepository = modeloRepository;
    }

    public List<Modelo> getAll() {
        List<Modelo> modelos = modeloRepository.findAllActive();
        return modelos;
    }

    public List<Modelo> getAllDeleted() {
        List<Modelo> modelos = modeloRepository.findAllDeleted();
        return modelos;
    }

    public Optional<Modelo> getById(Long id) {
        return modeloRepository.findById(id);
    }

    public Modelo save(Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    public Modelo recoverModelo(Modelo recoverModelo) {
        Optional<Modelo> optionalModelo =  getById(recoverModelo.getId());

        Modelo modelo = optionalModelo.get();
        modelo.recover();
        save(modelo);

        return modelo;
    }

    public void delete(Modelo modelo) {
        Optional<Modelo> modeloOptional = getById(modelo.getId());

        if (modeloOptional.isPresent()) {
            modeloOptional.get().delete();
            save(modeloOptional.get());
        }
    }

    public Modelo alter(Modelo alterModelo) {
        String nombre = alterModelo.getNombre();

        Optional<Modelo> optionalModelo = getById(alterModelo.getId());

        if (optionalModelo.isPresent()) {
            Modelo modelo = optionalModelo.get();

            if (nombre != null)
                modelo.setNombre(nombre);

            return modeloRepository.save(modelo);
        }

        return alterModelo;
    }

}