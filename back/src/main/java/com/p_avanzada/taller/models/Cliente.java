package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

import java.time.LocalDateTime;

@Entity
@Table(name = "Cliente", schema = "public")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "telefono")
    private Long telefono;

    @Column(name = "nombre", length = 30)
    private String nombre;

    @Column(name = "apellido", length = 30)
    private String apellido;

    @Column(name = "mail", length = 100)
    private String mail;

    @Column(name = "direccion", length = 200)
    private String direccion;

    @Column(name = "ultima_visita")
    private LocalDateTime ultima_visita;

    @Column(name = "estado")
    private boolean estado = true;

    public void delete() {
        estado = false;
    }

    public void recover() {
        estado = true;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getMail() {
        return mail;
    }

    public LocalDateTime getUltima_visita() {
        return ultima_visita;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setUltima_visita(LocalDateTime ultima_visita) {
        this.ultima_visita = ultima_visita;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
