package com.p_avanzada.taller.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, String> {
    @Query("SELECT m FROM Marca m WHERE m.estado = true")
    List<Marca> findAllActive();

    @Query("SELECT m FROM Marca m WHERE m.estado = false")
    List<Marca> findAllDeleted();
}
