package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.p_avanzada.taller.models.Tecnico;

import java.util.Optional;

@Service
public class TecnicoService {
    private final TecnicoRepository tecnicoRepository;

    @Autowired
    public TecnicoService(TecnicoRepository tecnicoRepository) {
        this.tecnicoRepository = tecnicoRepository;
    }

    public List<Tecnico> getAll() {
        List<Tecnico> tecnicos = tecnicoRepository.findAll();
        return tecnicos;
    }

    public Optional<Tecnico> getById(Long id) {
        return tecnicoRepository.findById(id);
    }

    public Tecnico save(Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    public void delete(Tecnico tecnico) {
        tecnico.delete();
        save(tecnico);
    }

    public Tecnico alter(Tecnico alterTecnico) {
        String nombre = alterTecnico.getNombre();
        String apellido = alterTecnico.getApellido();
        int telefono = alterTecnico.getTelefono();

        Optional<Tecnico> optionalTecnico = getById(alterTecnico.getId());

        if (optionalTecnico.isPresent()) {
            Tecnico tecnico = optionalTecnico.get();

            if (nombre != null)
                tecnico.setNombre(nombre);
            if (apellido != null)
                tecnico.setApellido(apellido);
            if (telefono != 0)
                tecnico.setTelefono(telefono);

            return tecnicoRepository.save(tecnico);
        }

        return alterTecnico;
    }

}