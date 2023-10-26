package com.p_avanzada.taller.services;

import com.p_avanzada.taller.repositories.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.p_avanzada.taller.models.Cliente;
import com.p_avanzada.taller.models.Vehiculo;

import java.util.Optional;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Optional<Cliente> getByTelefono(Long telefono) {
        return clienteRepository.findByTelefono(telefono);
    }

    public List<Cliente> getAll() {
        List<Cliente> clientes = clienteRepository.findAllActive();
        return clientes;
    }

    public Optional<Cliente> getById(Long id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> getAllDeleted() {
        List<Cliente> clientes = clienteRepository.findAllDeleted();
        return clientes;
    }

    public void delete(Cliente cliente) {
        Optional<Cliente> optionalCliente = getByTelefono(cliente.getTelefono());

        if (optionalCliente.isPresent()) {
            optionalCliente.get().delete();
            clienteRepository.save(optionalCliente.get());
        }
    }

    public Cliente alter(Cliente alterCliente) {
        String nombre = alterCliente.getNombre();
        String apellido = alterCliente.getApellido();
        // int telefono = alterCliente.getTelefono();

        Optional<Cliente> optionalCliente = getByTelefono(alterCliente.getTelefono());

        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();

            if (nombre != null)
                cliente.setNombre(nombre);
            if (apellido != null)
                cliente.setApellido(apellido);
            // if (telefono != 0)
            // cliente.setTelefono(telefono);

            return clienteRepository.save(cliente);
        }

        return alterCliente;
    }

    public Optional<Cliente> newCliente(Cliente cliente) {
        Optional<Cliente> clienteOptional = getByTelefono(cliente.getTelefono());
        if (clienteOptional.isPresent())
            return Optional.empty();
        else {
            Cliente nuevoCliente = clienteRepository.save(cliente);
            return Optional.of(nuevoCliente);
        }
    }

    public Cliente recoverCliente(Cliente recoverCliente) {
        Optional<Cliente> optionalCliente = getByTelefono(recoverCliente.getTelefono());

        Cliente cliente = optionalCliente.get();
        cliente.recover();
        clienteRepository.save(cliente);

        return cliente;
    }

}