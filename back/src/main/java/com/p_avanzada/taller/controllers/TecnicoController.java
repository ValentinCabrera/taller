package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Tecnico;
import java.util.List;

import com.p_avanzada.taller.services.TecnicoService;

@RestController
@RequestMapping("/api/tecnico")
@CrossOrigin
public class TecnicoController {
    private final TecnicoService tecnicoService;

    @Autowired
    public TecnicoController(TecnicoService tecnicoService) {
        this.tecnicoService = tecnicoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Tecnico>> getAlltecnicos() {
        List<Tecnico> tecnicos = tecnicoService.getAll();
        return ResponseEntity.ok(tecnicos);
    }

    @PostMapping("/new")
    public ResponseEntity<Tecnico> newtecnico(@RequestBody Tecnico newTecnico) {
        Tecnico tecnico = tecnicoService.save(newTecnico);
        return ResponseEntity.ok(tecnico);
    }

    @PostMapping("/delete")
    public ResponseEntity<Tecnico> deleteCleinte(@RequestBody Tecnico tecnico) {
        tecnicoService.delete(tecnico);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/alter")
    public ResponseEntity<Tecnico> altertecnico(@RequestBody Tecnico newTecnico) {
        Tecnico alterTecnico = tecnicoService.alter(newTecnico);
        return ResponseEntity.ok(alterTecnico);
    }
}
