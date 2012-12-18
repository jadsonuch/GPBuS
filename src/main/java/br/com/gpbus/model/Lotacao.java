package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the lotacao database table.
 * 
 */
@Entity
public class Lotacao implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String codigo;

	private String nome;

	//bi-directional many-to-one association to LotacaoMapa
	@OneToMany(mappedBy="lotacao")
	private List<LotacaoMapa> lotacaoMapas;

	public Lotacao() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<LotacaoMapa> getLotacaoMapas() {
		return this.lotacaoMapas;
	}

	public void setLotacaoMapas(List<LotacaoMapa> lotacaoMapas) {
		this.lotacaoMapas = lotacaoMapas;
	}

}