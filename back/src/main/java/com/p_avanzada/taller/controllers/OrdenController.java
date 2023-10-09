package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Orden;
import java.util.List;

import com.p_avanzada.taller.services.OrdenService;

@RestController
@RequestMapping("/api/Orden")
@CrossOrigin
public class OrdenController {
    private final OrdenService OrdenService;

    @Autowired
    public OrdenController(OrdenService OrdenService) {
        this.OrdenService = OrdenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Orden>> getAllOrdens() {
        List<Orden> Ordens = OrdenService.getAll();
        return ResponseEntity.ok(Ordens);
    }

    @PostMapping("/new")
    public ResponseEntity<Orden> newOrden(@RequestBody Orden newOrden) {
        Orden Orden = OrdenService.save(newOrden);
        return ResponseEntity.ok(Orden);
    }

    @PostMapping("/delete")
    public ResponseEntity<Orden> deleteCleinte(@RequestBody Orden Orden) {
        OrdenService.delete(Orden);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/alter")
    public ResponseEntity<Orden> alterOrden(@RequestBody Orden newOrden) {
        Orden alterOrden = OrdenService.alter(newOrden);
        return ResponseEntity.ok(alterOrden);
    }
}
