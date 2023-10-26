package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name = "Tecnico", schema = "public")
public class Tecnico {

    @Id
    @Column(name = "telefono")
    private Long telefono;

    @Column(name = "nombre", length = 30)
    private String nombre;

    @Column(name = "apellido", length = 30)
    private String apellido;

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

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public String getApellido() {
        return apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public Long getTelefono() {
        return telefono;
    }

    public boolean getEstado() {
        return estado;
    }
}
