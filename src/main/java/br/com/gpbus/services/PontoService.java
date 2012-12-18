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


	public List<Object[]> findParadasQueSeCruzam(List<Float> origem,
			List<Float> destino) {
		
		Query q = entityManager.createNativeQuery(			
				"SELECT  a.id_linhas AID, c.codigo ccodigo, c.nome cnome, b.id_linhas BID, d.codigo dcodigo, d.nome dnome " +
				"from linha_ponto a, linha_ponto b, linha c, linha d " +
				"where a.id_linhas in (:origem) " +
				"and b.id_linhas in (:destino) " +
				"and a.id_pontos = b.id_pontos " +
				"and c.id = a.id_linhas " +
				"and d.id = b.id_linhas " +
				"GROUP BY AID, BID ");		
		
		System.out.println("origem"+origem);	
		System.out.println("destino"+destino);
		q.setParameter("origem", origem);
		q.setParameter("destino", destino);	
		@SuppressWarnings("unchecked")
		List<Object[]> result = q.getResultList();
		for (Object[] l : result){
			System.out.println("\t" + l[0] + "\t" + l[1]+"\t" + l[2] + "\t" + l[3]+"\t" + l[4] + "\t" + l[5]);
			
		}
		return result;
	}
}
