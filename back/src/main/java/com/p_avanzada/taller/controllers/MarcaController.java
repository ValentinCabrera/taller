package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Marca;
import java.util.List;

import com.p_avanzada.taller.services.MarcaService;

@RestController
@RequestMapping("/api/marca")
@CrossOrigin
public class MarcaController {
    private final MarcaService marcaService;

    @Autowired
    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Marca>> getAllmarcas() {
        List<Marca> marcas = marcaService.getAll();
        return ResponseEntity.ok(marcas);
    }

    @PostMapping("/new")
    public ResponseEntity<Marca> newmarca(@RequestBody Marca newMarca) {
        Marca marca = marcaService.save(newMarca);
        return ResponseEntity.ok(marca);
    }

    @PostMapping("/delete")
    public ResponseEntity<Marca> deleteCleinte(@RequestBody Marca marca) {
        marcaService.delete(marca);
        return ResponseEntity.ok(null);
    }
}
