package com.p_avanzada.taller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Modelo;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
}
