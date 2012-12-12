package br.com.gpbus.util;

import java.util.List;

import br.com.gpbus.model.Linha;

public class DataMultipleResponse {
	
	private Linha origem;
	private List<Linha> destination;
	
	public DataMultipleResponse(){
		
	}
		
	public DataMultipleResponse(Linha origem, List<Linha> destination) {
		this.origem = origem;
		this.destination = destination;
	}

	public Linha getOrigem() {
		return origem;
	}
	public void setOrigem(Linha origem) {
		this.origem = origem;
	}
	public List<Linha> getDestination() {
		return destination;
	}
	public void setDestination(List<Linha> destination) {
		this.destination = destination;
	}
	
	@Override
	public String toString() {
		return String.format(
				"%s[src(%s) - dst(%s)]",
				getClass().getSimpleName(),
				getOrigem(),
				getDestination());
	}
	
}
