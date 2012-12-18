package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the ponto_mapa database table.
 * 
 */
@Entity
@Table(name="ponto_mapa")
public class PontoMapa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private float lat;

	private float lng;

	private int ordem;

	//bi-directional many-to-one association to Linha
	@ManyToOne
	@JoinColumn(name="ID_LINHA")
	private Linha linha;

	public PontoMapa() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getLat() {
		return this.lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}

	public float getLng() {
		return this.lng;
	}

	public void setLng(float lng) {
		this.lng = lng;
	}

	public int getOrdem() {
		return this.ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public Linha getLinha() {
		return this.linha;
	}

	public void setLinha(Linha linha) {
		this.linha = linha;
	}

}