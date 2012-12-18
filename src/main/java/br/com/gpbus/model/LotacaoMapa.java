package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the lotacao_mapa database table.
 * 
 */
@Entity
@Table(name="lotacao_mapa")
public class LotacaoMapa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private float latitude;

	private float longitude;

	private int ordem;

	//bi-directional many-to-one association to Lotacao
	@ManyToOne
	@JoinColumn(name="ID_LOTACAO")
	private Lotacao lotacao;

	public LotacaoMapa() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getOrdem() {
		return this.ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public Lotacao getLotacao() {
		return this.lotacao;
	}

	public void setLotacao(Lotacao lotacao) {
		this.lotacao = lotacao;
	}

}