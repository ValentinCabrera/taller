package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Modelo;
import java.util.List;

import com.p_avanzada.taller.services.ModeloService;

@RestController
@RequestMapping("/api/modelo")
@CrossOrigin
public class ModeloController {
    private final ModeloService modeloService;

    @Autowired
    public ModeloController(ModeloService modeloService) {
        this.modeloService = modeloService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Modelo>> getAllmodelos() {
        List<Modelo> modelos = modeloService.getAll();
        return ResponseEntity.ok(modelos);
    }

    @PostMapping("/new")
    public ResponseEntity<Modelo> newmodelo(@RequestBody Modelo newModelo) {
        Modelo modelo = modeloService.save(newModelo);
        return ResponseEntity.ok(modelo);
    }

    @PostMapping("/delete")
    public ResponseEntity<Modelo> deleteCleinte(@RequestBody Modelo modelo) {
        modeloService.delete(modelo);
        return ResponseEntity.ok(null);
    }
}
