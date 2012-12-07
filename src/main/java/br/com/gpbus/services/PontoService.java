package br.com.gpbus.services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.gpbus.model.Ponto;


@Stateless
public class PontoService extends EJBImpl<Ponto, Integer> {
	
	@PersistenceContext(unitName="GPbus")
	EntityManager entityManager;
			
	public PontoService(){
		super(Ponto.class);
	}
}
