package com.p_avanzada.taller.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

        @Query("SELECT o FROM Orden  o WHERE o.estado = true")
        List<Orden> findAllActive();

        @Query("SELECT o FROM Orden o WHERE o.estado = false")
        List<Orden> findAllDeleted();
}
