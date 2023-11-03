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
import com.p_avanzada.taller.models.Vehiculo;

import java.util.List;
import java.util.Optional;

import com.p_avanzada.taller.services.OrdenService;

@RestController
@RequestMapping("/api/orden")
@CrossOrigin
public class OrdenController {
    private final OrdenService ordenService;

    @Autowired
    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Orden>> getAllOrdenes() {
        List<Orden> ordenes = ordenService.getAll();
        return ResponseEntity.ok(ordenes);
    }

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Orden>> getAllOrdenesDeleted() {
        List<Orden> ordenes = ordenService.getAllDeleted();
        return ResponseEntity.ok(ordenes);
    }

    @PostMapping("/recover")
    public ResponseEntity<Orden> recoverOrden(@RequestBody Orden recoverOrden) {
        Orden orden = ordenService.recoverOrden(recoverOrden);
        return ResponseEntity.ok(orden);
    }

    @PostMapping("/new")
    public ResponseEntity<Orden> newOrden(@RequestBody Orden newOrden) {
        Orden orden = ordenService.newOrden(newOrden);
        return ResponseEntity.ok(orden);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteOrden(@RequestBody Orden orden) {
        ordenService.delete(orden);
        return ResponseEntity.ok("{}");
    }

    @PostMapping("/alter")
    public ResponseEntity<Orden> alterOrden(@RequestBody Orden alterOrden) {
        Orden orden = ordenService.alter(alterOrden);
        return ResponseEntity.ok(orden);
    }
}
