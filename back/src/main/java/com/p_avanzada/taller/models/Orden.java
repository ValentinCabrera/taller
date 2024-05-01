package com.p_avanzada.taller.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

@Entity
@Table(name = "Orden", schema = "public")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    @ManyToOne
    @JoinColumn(name = "vehiculo_patente")
    private Vehiculo vehiculo;

    @ManyToMany
    @JoinTable(name = "OrdenServicio", joinColumns = @JoinColumn(name = "orden_id"), inverseJoinColumns = @JoinColumn(name = "servicio_id"))
    private List<Servicio> servicios;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "estado")
    private boolean estado = true;

    @ManyToOne
    @JoinColumn(name = "estadoGestion_id")
    private EstadoGestion estadoGestion;

    @Column(name = "fecha")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "GMT")
    private Date fecha;

    @Column(name = "fechaProceso")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "GMT")
    private Date fechaProceso;

    @Column(name = "fechaEntrega")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "GMT")
    private Date fechaEntrega;

    public void delete() {
        estado = false;
    }

    public Date getFechaProceso() {
        return fechaProceso;
    }

    public Date getFechaEntrega() {
        return fechaEntrega;
    }

    public String getTiempoProceso() {
        if (fechaProceso == null) {
            return "0";
        }

        long diff = fechaProceso.getTime() - fecha.getTime();
        long diffSeconds = diff / 1000 % 60;
        long diffMinutes = diff / (60 * 1000) % 60;
        long diffHours = diff / (60 * 60 * 1000);

        return String.valueOf(diffHours);
    }

    public String getTiempoFinalizada() {
        if (fechaEntrega == null) {
            return "0";
        }

        long diff = fechaEntrega.getTime() - fechaProceso.getTime();
        long diffSeconds = diff / 1000 % 60;
        long diffMinutes = diff / (60 * 1000) % 60;
        long diffHours = diff / (60 * 60 * 1000);

        return String.valueOf(diffHours);
    }

    public void recover() {
        estado = true;
    }

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public EstadoGestion getEstadoGestion() {
        return estadoGestion;
    }

    public void setEstadoGestion(EstadoGestion estadoGestion) {
        this.estadoGestion = estadoGestion;

        if (estadoGestion.getId() == 1) {
            fechaProceso = new Date();
        } else if (estadoGestion.getId() == 2) {
            fechaEntrega = new Date();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Tecnico getTecnico() {
        return tecnico;
    }

    public void setTecnico(Tecnico tecnico) {
        this.tecnico = tecnico;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

}