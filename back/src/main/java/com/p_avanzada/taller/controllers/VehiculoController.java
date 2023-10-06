package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Vehiculo;
import java.util.List;

import com.p_avanzada.taller.services.VehiculoService;

@RestController
@RequestMapping("/api/vehiculo")
@CrossOrigin
public class VehiculoController {
    private final VehiculoService vehiculoService;

    @Autowired
    public VehiculoController(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Vehiculo>> getAllvehiculos() {
        List<Vehiculo> vehiculos = vehiculoService.getAll();
        return ResponseEntity.ok(vehiculos);
    }

    @PostMapping("/new")
    public ResponseEntity<Vehiculo> newvehiculo(@RequestBody Vehiculo newVehiculo) {
        Vehiculo vehiculo = vehiculoService.save(newVehiculo);
        return ResponseEntity.ok(vehiculo);
    }

    @PostMapping("/delete")
    public ResponseEntity<Vehiculo> deleteCleinte(@RequestBody Vehiculo vehiculo) {
        vehiculoService.delete(vehiculo);
        return ResponseEntity.ok(null);
    }
}
