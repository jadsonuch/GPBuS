package br.com.gpbus.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the linhas database table.
 * 
 */
@Entity
@Table(name="linhas")
public class Linha implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String codigo;

	private String nome;

	//bi-directional many-to-many association to Ponto
	@ManyToMany
	@JoinTable(
		name="linhas_pontos"
		, joinColumns={
			@JoinColumn(name="ID_LINHAS")
			}
		, inverseJoinColumns={
			@JoinColumn(name="ID_PONTOS")
			}
		)
	private List<Ponto> pontos;

	public Linha() {
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

}