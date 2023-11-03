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
import com.p_avanzada.taller.models.Servicio;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Marca> newServicio(@RequestBody Marca newMarca) {
        Optional<Marca> mOptional = marcaService.newMarca(newMarca);

        if (mOptional.isPresent()) {
            return ResponseEntity.ok(mOptional.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteMarca(@RequestBody Marca marca) {
        marcaService.delete(marca);
        return ResponseEntity.ok("{}");
    }

    @PostMapping("/recover")
    public ResponseEntity<Marca> recoverMarca(@RequestBody Marca recoverMarca) {
        Marca marca = marcaService.recoverMarca(recoverMarca);
        return ResponseEntity.ok(marca);
    }

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Marca>> getAllMarcaDeleted() {
        List<Marca> marca = marcaService.getAllDeleted();
        return ResponseEntity.ok(marca);
    }
}
