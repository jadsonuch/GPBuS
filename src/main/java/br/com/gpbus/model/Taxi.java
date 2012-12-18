package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the taxis database table.
 * 
 */
@Entity
@Table(name="taxis")
public class Taxi implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String endereco;

	private float latitude;

	private float longitude;

	private String telefone;

	public Taxi() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEndereco() {
		return this.endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public float getLatitude() {
		return this.latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return this.longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public String getTelefone() {
		return this.telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

}