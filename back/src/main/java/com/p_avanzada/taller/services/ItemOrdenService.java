package com.p_avanzada.taller.services;

import com.p_avanzada.taller.models.ItemOrden;
import com.p_avanzada.taller.models.ItemOrden;
import com.p_avanzada.taller.models.Marca;
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

    public Optional<ItemOrden> getById(Long id) {
        return itemOrdenRepository.findById(id);
    }

    public Optional<ItemOrden> newItemOrden(ItemOrden itemOrden) {
        Optional<ItemOrden> itemOptional = getById(itemOrden.getId());
        if (itemOptional.isPresent())
            return Optional.empty();
        else {
            ItemOrden newItemOrden = itemOrdenRepository.save(itemOrden);
            return Optional.of(newItemOrden);
        }
    }

    public ItemOrden alter(ItemOrden alterItemOrden) {
        ItemOrden itemOrden = getById(alterItemOrden.getId()).get();

        itemOrden.setDescuento(alterItemOrden.getDescuento());
        itemOrden.setRecargo(alterItemOrden.getRecargo());
        itemOrden.setServicio(alterItemOrden.getServicio());

        itemOrdenRepository.save(itemOrden);

        return itemOrden;
    }
}