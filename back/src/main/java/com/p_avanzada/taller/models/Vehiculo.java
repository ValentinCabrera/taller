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
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    @Column(name = "año")
    private int año;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Column(name = "estado")
    private boolean estado = true;

    public void delete() {
        this.estado = false;
    }

    public void recover() {
        this.estado = true;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public Tecnico getTecnico() {
        return tecnico;
    }
    
    public void setTecnico(Tecnico tecnico) {
        this.tecnico = tecnico;
    }
    
    public String getPatente() {
        return patente;
    }

    public boolean getEstado() {
        return estado;
    }

    public int getAño() {
        return año;
    }

    public void setAño(int año) {
        this.año = año;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }
}
