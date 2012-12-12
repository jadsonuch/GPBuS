package br.com.gpbus.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import br.com.gpbus.model.Linha;
import br.com.gpbus.services.PontoService;
import br.com.gpbus.util.DataRequest;

@Stateless
public class BuscaController {

	@EJB
	private PontoService pontoService;	
	
	private List<Linha> linhasOrigem;
	private List<Linha> linhasDestino;
	
	public List<Linha> findLinhasIguais(DataRequest data) {	
		//{"src":[-30.0823102,-51.211220000000026],"dst":[-30.0232484,-51.183954400000005],"maxDistance":"0.5"}
		linhasOrigem = pontoService.findLinhasNearPonto(data.getSrc().get(0), data.getSrc().get(1));
		linhasDestino = pontoService.findLinhasNearPonto(data.getDst().get(0), data.getDst().get(1));
		List<Linha> linhasIguais = new ArrayList<Linha>(linhasOrigem);		
		linhasIguais.retainAll(linhasDestino);
		return linhasIguais;
	}
	
	public List<Linha> getLinhasOrigem() {
		return linhasOrigem;
	}

	public void setLinhasOrigem(List<Linha> linhasOrigem) {
		this.linhasOrigem = linhasOrigem;
	}

	public List<Linha> getLinhasDestino() {
		return linhasDestino;
	}

	public void setLinhasDestino(List<Linha> linhasDestino) {
		this.linhasDestino = linhasDestino;
	}
}
