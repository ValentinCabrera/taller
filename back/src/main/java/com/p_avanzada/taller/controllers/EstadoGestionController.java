package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.EstadoGestion;

import java.util.List;
import java.util.Optional;

import com.p_avanzada.taller.services.EstadoGestionService;

@RestController
@RequestMapping("/api/estadoGestion")
@CrossOrigin
public class EstadoGestionController {
    private final EstadoGestionService estadoGestionService;

    @Autowired
    public EstadoGestionController(EstadoGestionService estadoGestionService) {
        this.estadoGestionService = estadoGestionService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<EstadoGestion>> getAllEstadosGestion() {
        List<EstadoGestion> estadoGestions = estadoGestionService.getAll();
        return ResponseEntity.ok(estadoGestions);
    }
}
