package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.p_avanzada.taller.models.Tecnico;
import com.p_avanzada.taller.models.Vehiculo;

import java.util.Optional;

@Service
public class TecnicoService {
    private final TecnicoRepository tecnicoRepository;

    @Autowired
    public TecnicoService(TecnicoRepository tecnicoRepository) {
        this.tecnicoRepository = tecnicoRepository;
    }

    public List<Tecnico> getAll() {
        List<Tecnico> tecnicos = tecnicoRepository.findAllActive();
        return tecnicos;
    }

    public Optional<Tecnico> getById(Long id) {
        return tecnicoRepository.findById(id);
    }

    public Tecnico save(Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    public List<Tecnico> getAllDeleted() {
        List<Tecnico> tecnico = tecnicoRepository.findAllDeleted();
        return tecnico;
    }

    public Tecnico alter(Tecnico alterTecnico) {
        Tecnico tecnico = getById(alterTecnico.getId()).get();
        tecnico.setApellido(alterTecnico.getApellido());
        tecnico.setNombre(alterTecnico.getNombre());
        tecnico.setTelefono(alterTecnico.getTelefono());
        save(tecnico);

        return tecnico;
    }

    public Optional<Tecnico> getByTelefono(Long telefono) {
        return tecnicoRepository.findByTelefono(telefono);
    }

    public void delete(Tecnico tecnico) {
        Optional<Tecnico> optionalTecnico = getByTelefono(tecnico.getTelefono());

        if (optionalTecnico.isPresent()) {
            optionalTecnico.get().delete();
            tecnicoRepository.save(optionalTecnico.get());
        }
    }

    public Tecnico recoverTecnico(Tecnico recoverTecnico) {
        Optional<Tecnico> optionalTecnico = getByTelefono(recoverTecnico.getTelefono());

        Tecnico tecnico = optionalTecnico.get();
        tecnico.recover();
        tecnicoRepository.save(tecnico);

        return tecnico;
    }

}