package com.p_avanzada.taller.services;

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
        List<Marca> marcas = marcaRepository.findAllActive();
        return marcas;
    }

    public Optional<Marca> getByName(String nombre) {
        return marcaRepository.findByNombre(nombre);
    }


    public List<Marca> getAllDeleted() {
        List<Marca> marca = marcaRepository.findAllDeleted();
        return marca;
    }

    public Marca save(Marca marca) {
        return marcaRepository.save(marca);
    }

    public Marca recoverMarca(Marca recoverMarca) {
        Optional<Marca> optionalMarca = getByName(recoverMarca.getNombre());

        Marca marca = optionalMarca.get();
        marca.recover();
        save(marca);

        return marca;
    }

    public void delete(Marca deleteMarca) {
        Optional<Marca> optionalMarca = getByName(deleteMarca.getNombre());

        if (optionalMarca.isPresent()) {
            Marca marca = optionalMarca.get();
            marca.delete();
            save(marca);
        }
    }
}