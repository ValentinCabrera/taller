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
import com.p_avanzada.taller.models.Vehiculo;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.p_avanzada.taller.services.TecnicoService;
import com.p_avanzada.taller.services.VehiculoService;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/api/tecnico")
@CrossOrigin
public class TecnicoController {
    private final TecnicoService tecnicoService;
    private final VehiculoService vehiculoService;

    @Autowired
    public TecnicoController(TecnicoService tecnicoService, VehiculoService vehiculoService) {
        this.tecnicoService = tecnicoService;
        this.vehiculoService = vehiculoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Map<String, Object>>> getAlltecnicos() {
        List<Tecnico> tecnicos = tecnicoService.getAll();
        List<Vehiculo> vehiculos = vehiculoService.getAll();

        List<Map<String, Object>> tecnicosConVehiculos = new ArrayList<>();

        for (Tecnico tecnico : tecnicos) {
            Map<String, Object> tecnicoConVehiculos = new HashMap<>();

            // Crear un mapa para almacenar los atributos del técnico
            Map<String, Object> datosTecnico = new HashMap<>();
            datosTecnico.put("id", tecnico.getId());
            datosTecnico.put("telefono", tecnico.getTelefono());
            datosTecnico.put("nombre", tecnico.getNombre());
            datosTecnico.put("apellido", tecnico.getApellido());

            List<Map<String, Object>> vehiculosTecnico = new ArrayList<>();
            for (Vehiculo vehiculo : vehiculos) {
                if (tecnico.getId() == vehiculo.getTecnico().getId()) {
                    Map<String, Object> datosVehiculo = new HashMap<>();
                    datosVehiculo.put("patente", vehiculo.getPatente());
                    datosVehiculo.put("modelo", vehiculo.getModelo());
                    // Puedes agregar más atributos del vehículo si lo necesitas
                    vehiculosTecnico.add(datosVehiculo);
                }
            }

            datosTecnico.put("vehiculos", vehiculosTecnico);

            tecnicosConVehiculos.add(datosTecnico);

        }

        return ResponseEntity.ok(tecnicosConVehiculos);
    }

    @PostMapping("/new")
    public ResponseEntity<Tecnico> newTecnico(@RequestBody Tecnico newTecnico) {
        Tecnico tecnico = tecnicoService.save(newTecnico);
        return ResponseEntity.ok(tecnico);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteTecnico(@RequestBody Tecnico tecnico) {
        tecnicoService.delete(tecnico);
        return ResponseEntity.ok("{}");
    }

    @PostMapping("/alter")
    public ResponseEntity<Tecnico> altertecnico(@RequestBody Tecnico alterTecnico) {
        Tecnico tecnico = tecnicoService.alter(alterTecnico);
        return ResponseEntity.ok(tecnico);
    }

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Tecnico>> getAllTecnicoDeleted() {
        List<Tecnico> tecnico = tecnicoService.getAllDeleted();
        return ResponseEntity.ok(tecnico);
    }

    @PostMapping("/recover")
    public ResponseEntity<Tecnico> recoverTecnico(@RequestBody Tecnico recoverTecnico) {
        Tecnico tecnico = tecnicoService.recoverTecnico(recoverTecnico);
        return ResponseEntity.ok(tecnico);
    }
}
