package com.p_avanzada.taller.services;

import com.p_avanzada.taller.models.EstadoGestion;
import com.p_avanzada.taller.repositories.EstadoGestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class EstadoGestionService {
    private final EstadoGestionRepository estadoGestionRepository;

    @Autowired
    public EstadoGestionService(EstadoGestionRepository estadoGestionRepository) {
        this.estadoGestionRepository = estadoGestionRepository;
    }

    public List<EstadoGestion> getAll() {
        List<EstadoGestion> estadoGestions = estadoGestionRepository.findAll();
        return estadoGestions;
    }
}