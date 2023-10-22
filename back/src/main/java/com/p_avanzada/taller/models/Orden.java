package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name = "Orden", schema = "public")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "numeroDeOrden")
    private Long numeroDeOrden;

    @Column(name = "cliente_id")
    private Long cliente_id;

    @Column(name = "vehiculo_id")
    private Long vehiculo_id;

    @Column(name = "servicio", length = 30)
    private String servicio;

    @Column(name = "informacion_adicional", length = 100)
    private String informacion_adicional;

    @Column(name = "estado")
    private boolean estado = true;

    public void delete() {
        estado = false;
    }

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumeroDeOrden() {
        return numeroDeOrden;
    }

    public void setNumeroDeOrden(Long numeroDeOrden) {
        this.numeroDeOrden = numeroDeOrden;
    }

    public Long getIdCliente() {
        return cliente_id;
    }

    public void setIdCliente(Long cliente_id) {
        this.cliente_id = cliente_id;
    }

    public Long getIdVehiculo() {
        return vehiculo_id;
    }

    public void setIdVehiculo(Long vehiculo_id) {
        this.vehiculo_id = vehiculo_id;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public String getInformacion() {
        return informacion_adicional;
    }
    public void setInformacion(String informacion_adicional) {
        this.informacion_adicional = informacion_adicional;
    }
}