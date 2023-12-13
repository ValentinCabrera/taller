package com.p_avanzada.taller.repositories;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.p_avanzada.taller.models.ItemOrden;


@Repository
public interface ItemOrdenRepository extends JpaRepository<ItemOrden, Long> {
    @Query("SELECT e FROM ItemOrden e")
    List<ItemOrden> findAll();
}
