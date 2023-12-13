package com.p_avanzada.taller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p_avanzada.taller.models.ItemOrden;

import java.util.List;
import java.util.Optional;

import com.p_avanzada.taller.services.ItemOrdenService;

@RestController
@RequestMapping("/api/itemOrden")
@CrossOrigin
public class ItemOrdenController {
    private final ItemOrdenService itemOrdenService;

    @Autowired
    public ItemOrdenController(ItemOrdenService itemOrdenService) {
        this.itemOrdenService = itemOrdenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ItemOrden>> getAllEstadosGestion() {
        List<ItemOrden> itemOrdens = itemOrdenService.getAll();
        return ResponseEntity.ok(itemOrdens);
    }
}
