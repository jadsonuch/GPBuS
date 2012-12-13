package br.com.gpbus.util;

import br.com.gpbus.model.Linha;

public class DataMultipleResponse {
	
	private Linha origem;
	private Linha destination;
	
	public DataMultipleResponse(){		
	}
		
	public DataMultipleResponse(Linha origem, Linha destination) {
		this.origem = origem;
		this.destination = destination;
	}

	public Linha getOrigem() {
		return origem;
	}
	public void setOrigem(Linha origem) {
		this.origem = origem;
	}
	
	public Linha getDestination() {
		return destination;
	}

	public void setDestination(Linha destination) {
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
