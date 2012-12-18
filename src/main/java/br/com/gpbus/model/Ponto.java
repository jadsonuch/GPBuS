package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the ponto database table.
 * 
 */
@Entity
public class Ponto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private float lat;

	private float lng;

	private String terminal;

	//bi-directional many-to-many association to Linha
	@ManyToMany(mappedBy="pontos")
	private List<Linha> linhas;

	public Ponto() {
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

	public String getTerminal() {
		return this.terminal;
	}

	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}

	public List<Linha> getLinhas() {
		return this.linhas;
	}

	public void setLinhas(List<Linha> linhas) {
		this.linhas = linhas;
	}

}