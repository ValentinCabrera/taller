package com.p_avanzada.taller.repositories;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Tecnico;

@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {
    @Query("SELECT t FROM Tecnico t WHERE t.estado = true")
    List<Tecnico> findAllActive();

    @Query("SELECT t FROM Tecnico t WHERE t.estado = false")
    List<Tecnico> findAllDeleted();

    Optional<Tecnico> findByTelefono(Long telefono);
}
