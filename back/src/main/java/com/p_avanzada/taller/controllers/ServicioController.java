package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Servicio;
import java.util.List;

import com.p_avanzada.taller.services.ServicioService;

@RestController
@RequestMapping("/api/servicio")
@CrossOrigin
public class ServicioController {
    private final ServicioService servicioService;

    @Autowired
    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Servicio>> getAllServicios() {
        List<Servicio> servicios = servicioService.getAll();
        return ResponseEntity.ok(servicios);
    }

    @PostMapping("/new")
    public ResponseEntity<Servicio> newServicio(@RequestBody Servicio newServicio) {
        Servicio servicio = servicioService.save(newServicio);
        return ResponseEntity.ok(servicio);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteServicio(@RequestBody Servicio servicio) {
        servicioService.delete(servicio);
        return ResponseEntity.ok("{}");
    }

    @PostMapping("/recover")
    public ResponseEntity<Servicio> recoverServicio(@RequestBody Servicio recoverServicio) {
        Servicio servicio = servicioService.recoverServicio(recoverServicio);
        return ResponseEntity.ok(servicio);
    }

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Servicio>> getAllServiciosDeleted() {
        List<Servicio> servicios = servicioService.getAllDeleted();
        return ResponseEntity.ok(servicios);
    }
}
