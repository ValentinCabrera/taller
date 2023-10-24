package com.p_avanzada.taller.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {
    @Query("SELECT v FROM Vehiculo v JOIN FETCH v.modelo JOIN FETCH v.cliente WHERE v.estado = true")
    List<Vehiculo> findAllActive();

    @Query("SELECT v FROM Vehiculo v JOIN FETCH v.modelo JOIN FETCH v.cliente WHERE v.estado = false")
    List<Vehiculo> findAllDeleted();

    Optional<Vehiculo> findByPatente(String patente);
}
