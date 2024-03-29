package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the linha database table.
 * 
 */
@Entity
public class Linha implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String codigo;

	private String nome;

	//bi-directional many-to-many association to Ponto
	@ManyToMany
	@JoinTable(
		name="linha_ponto"
		, joinColumns={
			@JoinColumn(name="ID_LINHAS")
			}
		, inverseJoinColumns={
			@JoinColumn(name="ID_PONTOS")
			}
		)
	private List<Ponto> pontos;

	//bi-directional many-to-one association to PontoMapa
	@OneToMany(mappedBy="linha")
	private List<PontoMapa> pontoMapas;

	public Linha() {
	}
	
	public Linha(int id, String codigo, String nome) {
		super();
		this.id = id;
		this.codigo = codigo;
		this.nome = nome;
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

	public List<Ponto> getPontos() {
		return this.pontos;
	}

	public void setPontos(List<Ponto> pontos) {
		this.pontos = pontos;
	}

	public List<PontoMapa> getPontoMapas() {
		return this.pontoMapas;
	}

	public void setPontoMapas(List<PontoMapa> pontoMapas) {
		this.pontoMapas = pontoMapas;
	}
	
	@Override
	public String toString() {
		return String.format(
				"%s[%s - %s - %s]",
				getClass().getSimpleName(),
				getId(),
				getCodigo(),
				getNome());
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == this) {
			return true;
		}
		if (obj == null || obj.getClass() != this.getClass()) {
			return false;
		}
		
		Linha o = (Linha) obj;
		if (this.getId() == o.getId()){
			return true;  
		}else{
			return false;
		}
	}



}