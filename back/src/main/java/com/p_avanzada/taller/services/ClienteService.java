package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.p_avanzada.taller.models.Cliente;

import java.util.Optional;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> getAll() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes;
    }

    public Optional<Cliente> getById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void delete(Cliente deleteCliente) {
        Optional<Cliente> optionalCliente = getById(deleteCliente.getId());

        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();
            cliente.delete();
            clienteRepository.save(cliente);
        }
    }

    public Cliente alter(Cliente alterCliente) {
        String nombre = alterCliente.getNombre();
        String apellido = alterCliente.getApellido();
        int telefono = alterCliente.getTelefono();

        Optional<Cliente> optionalCliente = getById(alterCliente.getId());

        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();

            if (nombre != null)
                cliente.setNombre(nombre);
            if (apellido != null)
                cliente.setApellido(apellido);
            if (telefono != 0)
                cliente.setTelefono(telefono);

            return clienteRepository.save(cliente);
        }

        return alterCliente;
    }

}