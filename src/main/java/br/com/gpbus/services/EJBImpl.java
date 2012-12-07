package br.com.gpbus.services;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;


public abstract class EJBImpl<E, K extends Serializable> implements IEJB<E, K> {
	
	protected Class<E> entityClass;

	@PersistenceContext(unitName="GPbus")
	protected EntityManager entityManager;
	
	public EJBImpl(Class<E> entityClass) {
		this.entityClass = entityClass;
	}
	
	@Override
	public E find(K primaryKey) {
		return entityManager.find(entityClass, primaryKey);
	}

	@Override
	public List<E> findAll() {
		TypedQuery<E> query = entityManager.createQuery(
				"FROM " + entityClass.getName(),
				entityClass);
		return query.getResultList();
	}
	
	@Override
	public void persist(E entity) {
		entityManager.persist(entity);
	}

	@Override
	public void remove(E entity) {
		entityManager.remove(entityManager.merge(entity));
	}
	
	@Override
	public E merge(E entity) {
		E merged = entity;
		merged = entityManager.merge(entity);
		return merged;
	}

}