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
        List<Modelo> modelos = modeloRepository.findAll();
        return modelos;
    }

    public Optional<Modelo> getById(Long id) {
        return modeloRepository.findById(id);
    }

    public Modelo save(Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    public void delete(Modelo modelo) {
        modelo.delete();
        save(modelo);
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