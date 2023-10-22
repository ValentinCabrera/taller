package com.p_avanzada.taller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
}
