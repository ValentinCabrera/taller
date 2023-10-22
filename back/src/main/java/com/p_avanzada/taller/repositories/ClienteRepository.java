package com.p_avanzada.taller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("SELECT c FROM Cliente c WHERE c.estado = true")
    List<Cliente> findAllActive();

    @Query("SELECT c FROM Cliente c WHERE c.estado = false")
    List<Cliente> findAllDeleted();
}
