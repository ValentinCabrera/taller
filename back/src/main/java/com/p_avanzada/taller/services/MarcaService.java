package com.p_avanzada.taller.services;

import com.p_avanzada.taller.models.Cliente;
import com.p_avanzada.taller.models.Marca;
import com.p_avanzada.taller.repositories.MarcaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class MarcaService {
    private final MarcaRepository marcaRepository;

    @Autowired
    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    public List<Marca> getAll() {
        List<Marca> marcas = marcaRepository.findAll();
        return marcas;
    }

    public Optional<Marca> getById(String id) {
        return marcaRepository.findById(id);
    }

    public Marca save(Marca marca) {
        return marcaRepository.save(marca);
    }

    public void delete(Marca deleteMarca) {
        Optional<Marca> optionalMarca = getById(deleteMarca.getNombre());

        if (optionalMarca.isPresent()) {
            Marca marca = optionalMarca.get();
            marca.delete();
            marcaRepository.save(marca);
        }
    }
}