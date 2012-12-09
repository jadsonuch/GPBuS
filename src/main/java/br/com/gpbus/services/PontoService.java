package br.com.gpbus.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import br.com.gpbus.model.Linha;
import br.com.gpbus.model.Ponto;

@Stateless
public class PontoService extends EJBImpl<Ponto, Integer> {

	@PersistenceContext(unitName = "GPbus")
	EntityManager entityManager;

	public PontoService() {
		super(Ponto.class);
	}

	
	@SuppressWarnings("unchecked")
	public List<Linha> findLinhasNearPonto(Float latitude, Float longitude) {

		/*select distinct(b.ID_LINHAS)
		from 	pontos a, linhas_pontos b
		where (sqrt(((a.lat-(-30.0823102))*(a.lat-(-30.0823102)))+
		((a.lng-(-51.211220000000026))*(a.lng-(-51.211220000000026))))*PI()*6371)/180  < 0.5
		and b.ID_PONTOS = a.ID*/
		
		//TypedQuery<Linha> query = entityManager.createQuery(				
		Query query = entityManager.createQuery(				
				"SELECT distinct p.linhas " +
				"FROM Ponto p "+
				"WHERE (sqrt(((p.lat-(:latitude))*(p.lat-(:latitude)))+" +
				"((p.lng-(:longitude))*(p.lng-(:longitude))))*PI()*6371)/180 < 0.5 ");
		
		query.setParameter("latitude", latitude);
		query.setParameter("longitude", longitude);	
		List<Linha> result = query.getResultList();
		
		return result;
	}


	public List<Object[]> findParadasQueSeCruzam(List<Integer> origem,
			List<Integer> destino) {
		
		/*SELECT AA1.ID_LINHAS, BB1.ID_LINHAS
		FROM (
			SELECT AB1. *
			FROM linhas_pontos AB1
			WHERE AB1.ID_LINHAS IN ( 1, 2 )
		)AA1, (
			SELECT AB2. *
			FROM linhas_pontos AB2
			WHERE AB2.ID_LINHAS IN ( 3, 5, 6, 7 )
		)BB1
		WHERE AA1.ID_PONTOS = BB1.ID_PONTOS*/
		Query q = entityManager.createNativeQuery(			
				"SELECT AA1.ID_LINHAS, BB1.ID_LINHAS " +
				" FROM ( SELECT AB1.*" +
				" 		 FROM linhas_pontos AB1 " +
				"		 WHERE AB1.ID_LINHAS IN (:origem) " +
				")AA1, (" +
				" 		SELECT AB2.* FROM linhas_pontos AB2 " +
				" 		WHERE AB2.ID_LINHAS IN ( :destino ) " +
				")BB1" +
				" WHERE AA1.ID_PONTOS = BB1.ID_PONTOS " +
				" GROUP BY AA1.ID_LINHAS, BB1.ID_LINHAS");
		
		System.out.println("origem"+origem);
		System.out.println("destino"+destino);
		q.setParameter("origem", origem);
		q.setParameter("destino", destino);	
		List<Object[]> result = q.getResultList();
		for (Object[] l : result){
			System.out.println("\t" + l[0] + "\t" + l[1]);
		}
		return result;
	}
}
