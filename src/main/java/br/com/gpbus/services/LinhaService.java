package br.com.gpbus.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.Hibernate;

import br.com.gpbus.model.Linha;

@Stateless
public class LinhaService extends EJBImpl<Linha, Integer> {

		@PersistenceContext(unitName="GPbus")
		EntityManager entityManager;
				
		public LinhaService(){
			super(Linha.class);
		}

		/*public List<Linha> findLinha(Float float1, ArrayList<Float> dst) {

			return null;
		}*/

		/*public Linha findPontos(int idLinha) {			
			TypedQuery<Linha> query = entityManager.createQuery(								
					"FROM Pontos p " +
					"WHERE l.id = :idLinha ",Linha.class);		
			query.setParameter("idLinha", idLinha);		
			return query.getSingleResult();
		}*/

		public Linha findLinha(int idLinha) {			
			TypedQuery<Linha> query = entityManager.createQuery(								
					"FROM Linha l " +
					//"JOIN FETCH l.pontos "+
					"WHERE l.id = :idLinha ",Linha.class);		
			query.setParameter("idLinha", idLinha);		
			Linha l = query.getSingleResult();			
			Hibernate.initialize(l.getPontoMapas());
			return l;
		}
		
		public List<Linha> findLinha(List<Integer> destinos) {
			
			TypedQuery<Linha> query = entityManager.createQuery(								
					"FROM Linha l " +
					//"JOIN FETCH l.pontos "+
					"WHERE l.id IN ( :destinos )" +
					"ORDER BY l.id ",Linha.class);		
			query.setParameter("destinos", destinos);
			List<Linha> result = query.getResultList();
			for(Linha l : result){
				Hibernate.initialize(l.getPontoMapas());
			}
			System.out.println(result.size());
			return result;
		}

}
