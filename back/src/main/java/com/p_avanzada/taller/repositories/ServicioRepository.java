package com.p_avanzada.taller.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, String> {
    @Query("SELECT s FROM Servicio s WHERE s.estado = true")
    List<Servicio> findAllActive();

    @Query("SELECT s FROM Servicio s WHERE s.estado= false")
    List<Servicio> findAllDeleted();

    Optional<Servicio> findByNombre(String nombre);
}
