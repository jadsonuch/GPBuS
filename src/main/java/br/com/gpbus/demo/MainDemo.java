package br.com.gpbus.demo;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import br.com.gpbus.model.Linha;

public class MainDemo {

	public static void main(String[] args) {
		
		EntityManagerFactory emf;
		EntityManager em;
		
		emf = Persistence.createEntityManagerFactory("GPbus");
		em = emf.createEntityManager();
		
		Linha l = new Linha();
		l.setCodigo("777777");
		l.setId(777777);
		l.setNome("BLUE");
		EntityTransaction tx = null;
		try{
			tx = em.getTransaction();
			tx.begin();
			em.persist(l);
			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}
	}
	
}
