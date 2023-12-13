package com.p_avanzada.taller.repositories;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.EstadoGestion;


@Repository
public interface EstadoGestionRepository extends JpaRepository<EstadoGestion, Long> {
    @Query("SELECT e FROM EstadoGestion e")
    List<EstadoGestion> findAll();
}
