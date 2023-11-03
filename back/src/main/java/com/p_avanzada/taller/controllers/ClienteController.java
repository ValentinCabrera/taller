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
import java.util.Optional;

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

    @GetMapping("/listar/deleted")
    public ResponseEntity<List<Cliente>> getAllClienteDeleted() {
        List<Cliente> cliente = clienteService.getAllDeleted();
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/new")
    public ResponseEntity<Cliente> newCliente(@RequestBody Cliente newCliente) {
        Optional<Cliente> clienteOptional = clienteService.newCliente(newCliente);

        if (clienteOptional.isPresent()) {
            return ResponseEntity.ok(clienteOptional.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCleinte(@RequestBody Cliente cliente) {
        clienteService.delete(cliente);
        return ResponseEntity.ok("{}");
    }

    @PostMapping("/alter")
    public ResponseEntity<Cliente> alterCliente(@RequestBody Cliente alterCliente) {
        Cliente cliente = clienteService.alter(alterCliente);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/recover")
    public ResponseEntity<Cliente> recoverCliente(@RequestBody Cliente recoverCliente) {
        Cliente cliente = clienteService.recoverCliente(recoverCliente);
        return ResponseEntity.ok(cliente);
    }
}
