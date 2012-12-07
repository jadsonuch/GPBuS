package br.com.gpbus.services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.gpbus.model.Linha;

@Stateless
public class LinhaService extends EJBImpl<Linha, Integer> {

		@PersistenceContext(unitName="GPbus")
		EntityManager entityManager;
				
		public LinhaService(){
			super(Linha.class);
		}
}
