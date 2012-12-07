package br.com.gpbus.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import br.com.gpbus.model.Linha;
import br.com.gpbus.model.Ponto;

@Stateless
public class PontoService extends EJBImpl<Ponto, Integer> {

	@PersistenceContext(unitName = "GPbus")
	EntityManager entityManager;

	public PontoService() {
		super(Ponto.class);
	}

	public List<Linha> findLinhasNearPonto(Float latitude, Float longitude) {

		/*select distinct(b.ID_LINHAS)
		from 	pontos a, linhas_pontos b
		where (sqrt(((a.lat-(-30.0823102))*(a.lat-(-30.0823102)))+
		((a.lng-(-51.211220000000026))*(a.lng-(-51.211220000000026))))*PI()*6371)/180  < 0.5
		and b.ID_PONTOS = a.ID*/
		
		//TypedQuery<Linha> query = entityManager.createQuery(				
		Query query = entityManager.createQuery(				
				"SELECT p.linhas " +
				"FROM Ponto p "+
				"WHERE (sqrt(((p.lat-(:latitude))*(p.lat-(:latitude)))+" +
				"((p.lng-(:longitude))*(p.lng-(:longitude))))*PI()*6371)/180 > 0.5 ");
		
		query.setParameter("latitude", latitude);
		query.setParameter("longitude", longitude);		
		//List<Linha> result = query.getResultList();
		List result = query.getResultList();
		
		return result;
	}
}
