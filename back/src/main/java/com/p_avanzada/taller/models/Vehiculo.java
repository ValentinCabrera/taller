package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

@Entity
@Table(name = "Vehiculo", schema = "public")
public class Vehiculo {
    @Id
    @Column(name = "patente", length = 7)
    private String patente;

    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    @Column(name = "estado")
    private boolean estado = true;

    public void delete() {
        this.estado = false;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public String getPatente() {
        return patente;
    }

    public Tecnico getTecnico() {
        return tecnico;
    }

    public boolean getEstado() {
        return estado;
    }
}
