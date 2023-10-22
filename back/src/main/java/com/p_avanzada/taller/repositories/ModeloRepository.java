package com.p_avanzada.taller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Modelo;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    @Query("SELECT m FROM Modelo m WHERE m.estado = true")
    List<Modelo> findAllActive();

    @Query("SELECT m FROM Modelo m WHERE m.estado = false")
    List<Modelo> findAllDeleted();

}
