package com.p_avanzada.taller.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    @Query("SELECT o, o.vehiculo, o.vehiculo.modelo, o.vehiculo.modelo.marca, o.cliente, o.servicios FROM Orden o " +
            "LEFT JOIN FETCH o.cliente " +
            "LEFT JOIN FETCH o.vehiculo " +
            "LEFT JOIN FETCH o.vehiculo.modelo " +
            "LEFT JOIN FETCH o.vehiculo.modelo.marca " +
            "LEFT JOIN FETCH o.servicios " +
            "WHERE o.estado = true")
    List<Orden> findAllActive();

    @Query("SELECT o, o.vehiculo, o.vehiculo.modelo, o.vehiculo.modelo.marca, o.cliente, o.servicios FROM Orden o " +
            "LEFT JOIN FETCH o.cliente " +
            "LEFT JOIN FETCH o.vehiculo " +
            "LEFT JOIN FETCH o.vehiculo.modelo " +
            "LEFT JOIN FETCH o.vehiculo.modelo.marca " +
            "LEFT JOIN FETCH o.servicios " +
            "WHERE o.estado = false")
    List<Orden> findAllDeleted();
}
