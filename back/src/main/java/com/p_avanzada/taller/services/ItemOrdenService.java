package com.p_avanzada.taller.services;

import com.p_avanzada.taller.models.ItemOrden;
import com.p_avanzada.taller.repositories.ItemOrdenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class ItemOrdenService {
    private final ItemOrdenRepository itemOrdenRepository;

    @Autowired
    public ItemOrdenService(ItemOrdenRepository itemOrdenRepository) {
        this.itemOrdenRepository = itemOrdenRepository;
    }

    public List<ItemOrden> getAll() {
        List<ItemOrden> itemOrdens = itemOrdenRepository.findAll();
        return itemOrdens;
    }
}