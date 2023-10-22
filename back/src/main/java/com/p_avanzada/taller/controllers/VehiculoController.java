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
import java.util.Optional;

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

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Vehiculo>> getAllVehiculosDeleted() {
        List<Vehiculo> vehiculos = vehiculoService.getAllDeleted();
        return ResponseEntity.ok(vehiculos);
    }

    @PostMapping("/recover")
    public ResponseEntity<Vehiculo> recoverVehiculo(@RequestBody Vehiculo recoverVehiculo) {
        Vehiculo vehiculo = vehiculoService.recoverVehiculo(recoverVehiculo);
        return ResponseEntity.ok(vehiculo);
    }

    @PostMapping("/new")
    public ResponseEntity<Vehiculo> newVehiculo(@RequestBody Vehiculo newVehiculo) {
        Optional<Vehiculo> vehiculoOptional = vehiculoService.newVehiculo(newVehiculo);

        if (vehiculoOptional.isPresent()) {
            return ResponseEntity.ok(vehiculoOptional.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteVehiculo(@RequestBody Vehiculo vehiculo) {
        vehiculoService.delete(vehiculo);
        return ResponseEntity.ok("{}");
    }
}
