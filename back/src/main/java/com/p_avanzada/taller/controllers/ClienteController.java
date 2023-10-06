package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.Cliente;
import java.util.List;

import com.p_avanzada.taller.services.ClienteService;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin
public class ClienteController {
    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Cliente>> getAllClientes() {
        List<Cliente> clientes = clienteService.getAll();
        return ResponseEntity.ok(clientes);
    }

    @PostMapping("/new")
    public ResponseEntity<Cliente> newCliente(@RequestBody Cliente newCliente) {
        Cliente cliente = clienteService.save(newCliente);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/delete")
    public ResponseEntity<Cliente> deleteCleinte(@RequestBody Cliente cliente) {
        clienteService.delete(cliente);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/alter")
    public ResponseEntity<Cliente> alterCliente(@RequestBody Cliente newCliente) {
        Cliente alterCliente = clienteService.alter(newCliente);
        return ResponseEntity.ok(alterCliente);
    }
}
