package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name = "Servicio", schema = "public")
public class Servicio {
    @Id
    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "estado")
    private boolean estado = true;

    public void delete() {
        estado = false;
    }

    public void recover() {
        estado = true;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public boolean getEstado() {
        return estado;
    }

}
