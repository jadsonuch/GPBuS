package br.com.gpbus.util;

import java.io.Reader;
import java.lang.reflect.Type;
import java.util.Date;



import br.com.gpbus.model.Linha;
import br.com.gpbus.model.Ponto;
import br.com.gpbus.model.PontoMapa;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.JsonSyntaxException;

public class JsonBuilder {

	private static GsonBuilder gsonBuilder;

	/**
	 * Este método lê o Json do {@link Reader} especificado e desserializa em um
	 * objeto da classe {@code clazz}.
	 * 
	 * @param <T>
	 *            o tipo do objeto desejado
	 * @param json
	 *            o {@link Reader} que produz o Json a partir do qual objeto é
	 *            para ser desserializado
	 * @param clazz
	 *            a classe de T
	 * @return um objeto do tipo T a partir da {@link String}
	 * @throws JsonIOException
	 *             se houve um problema de leitura do {@code Reader}
	 * @throws JsonSyntaxException
	 *             se {@code json} não é uma representação válida para um objeto
	 *             da classe {@code clazz}
	 * 
	 * @see com.google.gson.Gson#fromJson(Reader, Class)
	 */
	public static <T> T fromJson(Reader json, Class<T> clazz)
			throws JsonIOException, JsonSyntaxException {
		return getGsonBuilder().create().fromJson(json, clazz);
	}

	/**
	 * Este método lê o Json do {@link Reader} especificado e desserializa em um
	 * objeto do tipo {@code type}.
	 * 
	 * @param <T>
	 *            o tipo do objeto desejado
	 * @param json
	 *            o {@link Reader} que produz o Json a partir do qual objeto é
	 *            para ser desserializado
	 * @param type
	 *            o tipo genérico de {@code json}
	 * @return um objeto do tipo T a partir do {@code json}
	 * @throws JsonIOException
	 *             se houve um problema de leitura do {@code Reader}
	 * @throws JsonSyntaxException
	 *             se {@code json} não é uma representação válida para um objeto
	 *             do tipo {@code type}
	 * 
	 * @see com.google.gson.Gson#fromJson(Reader, Type)
	 */
	@SuppressWarnings("unchecked")
	public static <T> T fromJson(Reader json, Type type)
			throws JsonIOException, JsonSyntaxException {
		return (T) getGsonBuilder().create().fromJson(json, type);
	}

	/**
	 * Este método desserializa o Json especificado em um objeto da classe
	 * especificada.
	 * 
	 * @param <T>
	 *            o tipo do objeto desejado
	 * @param json
	 *            a {@link String} da qual o objeto é para ser desserializado
	 * @param clazz
	 *            a classe de T
	 * @return um objeto do tipo T a partir da {@link String}
	 * @throws JsonSyntaxException
	 *             se json não é uma representação válida para um objeto do tipo
	 *             especificado
	 * 
	 * @see com.google.gson.Gson#fromJson(String, Class)
	 */
	public static <T> T fromJson(String json, Class<T> clazz)
			throws JsonSyntaxException {
		return getGsonBuilder().create().fromJson(json, clazz);
	}

	/**
	 * Este método desserializa o Json especificado em um objeto do tipo
	 * {@code type}.
	 * 
	 * @param <T>
	 *            o tipo do objeto desejado
	 * @param json
	 *            a {@link String} da qual o objeto é para ser desserializado
	 * @param type
	 *            o tipo genérico especificado de {@code json}
	 * @return um objeto do tipo T a partir da {@link String}
	 * @throws JsonParseException
	 *             se {@code json} não é uma representação válida para um objeto
	 *             do tipo {@code type}
	 * @throws JsonSyntaxException
	 *             se {@code json} não é uma representação válida para um objeto
	 *             do tipo {@code type}
	 * 
	 * @see com.google.gson.Gson#fromJson(String, Type)
	 */
	@SuppressWarnings("unchecked")
	public static <T> T fromJson(String json, Type type)
			throws JsonParseException, JsonSyntaxException {
		return (T) getGsonBuilder().create().fromJson(json, type);
	}

	private static GsonBuilder getGsonBuilder() {
		if (gsonBuilder == null) {
			gsonBuilder = new GsonBuilder();
			gsonBuilder.registerTypeAdapter(Ponto.class,
					new JsonSerializer<Ponto>() {
						@Override
						public JsonElement serialize(Ponto ponto,
								Type type, JsonSerializationContext context) {
							JsonObject json = new JsonObject();
							json.add("id", context.serialize(ponto.getId()));
							json.add("lat", context.serialize(ponto.getLat()));
							json.add("lng", context.serialize(ponto.getLng()));
							return json;
						}
					});	
			gsonBuilder.registerTypeAdapter(PontoMapa.class,
					new JsonSerializer<PontoMapa>() {
						@Override
						public JsonElement serialize(PontoMapa ponto,
								Type type, JsonSerializationContext context) {
							JsonObject json = new JsonObject();
							json.add("id", context.serialize(ponto.getId()));
							json.add("lat", context.serialize(ponto.getLat()));
							json.add("lng", context.serialize(ponto.getLng()));
							return json;
						}
					});	
			gsonBuilder.registerTypeAdapter(Linha.class,
					new JsonSerializer<Linha>() {
						@Override
						public JsonElement serialize(Linha linha,
								Type type, JsonSerializationContext context) {
							JsonObject json = new JsonObject();
							json.add("id", context.serialize(linha.getId()));
							json.add("codigo", context.serialize(linha.getCodigo()));
							json.add("nome", context.serialize(linha.getNome()));
														
							return json;
						}
					});			
			gsonBuilder.registerTypeAdapter(DataMultipleResponse.class,
					new JsonSerializer<DataMultipleResponse>() {
						@Override
						public JsonElement serialize(DataMultipleResponse dmr,
								Type type, JsonSerializationContext context) {
							JsonObject json = new JsonObject();
							json.add("id", context.serialize(dmr.getOrigem().getId()));
							json.add("codigo", context.serialize(dmr.getOrigem().getCodigo()));
							json.add("nome", context.serialize(dmr.getOrigem().getNome()));
							json.add("did", context.serialize(dmr.getDestination().getId()));
							json.add("dcodigo", context.serialize(dmr.getDestination().getCodigo()));
							json.add("dnome", context.serialize(dmr.getDestination().getNome()));							
							return json;
						}
					});			
			gsonBuilder.registerTypeAdapter(Date.class,
					new JsonSerializer<Date>() {
						@Override
						public JsonElement serialize(Date date, Type type,
								JsonSerializationContext context) {
							if (date == null) {
								return null;
							}
							return context.serialize(date.getTime());
						}
					});
		}
		return gsonBuilder;
	}

	/**
	 * Este método serializa o objeto especificado em sua representação Json
	 * equivalente.
	 * 
	 * @param src
	 *            o objeto para o qual a representação Json será criada
	 * @return representação Json de {@code src}
	 * 
	 * @see com.google.gson.Gson#toJson(Object)
	 */
	public static String toJson(Object src) {
		return getGsonBuilder().create().toJson(src);
	}

	/**
	 * Este método serializa o objeto especificado, incluindo os dos tipos
	 * genéricos, em sua representação Json equivalente.
	 * 
	 * @param src
	 *            o objeto para o qual a representação Json será criada
	 * @param type
	 *            o tipo genérico especificado de {@code src}
	 * @return representação Json de {@code src}
	 * 
	 * @see com.google.gson.Gson#toJson(Object, Type)
	 */
	public static String toJson(Object src, Type type) {
		return getGsonBuilder().create().toJson(src, type);
	}

	/**
	 * Este método serializa o objeto especificado, incluindo os dos tipos
	 * genéricos, em sua representação Json equivalente.
	 * 
	 * @param src
	 *            o objeto para o qual a representação Json será criada
	 * @param type
	 *            o tipo genérico especificado de {@code src}
	 * @param writer
	 *            {@code Writer} para o qual a representação Json deve ser
	 *            escrita
	 * @throws JsonIOException
	 *             se houver um problema ao escrever para o {@code Writer}
	 * 
	 * @see com.google.gson.Gson#toJson(Object, Type, Appendable)
	 */
	public static void toJson(Object src, Type type, Appendable writer)
			throws JsonIOException {
		getGsonBuilder().create().toJson(src, type, writer);
	}

	/**
	 * Este método serializa o objeto especificado em sua representação Json
	 * equivalente.
	 * 
	 * @param src
	 *            o objeto para o qual a representação Json será criada
	 * @param type
	 *            o tipo genérico especificado de {@code src}
	 * @param writer
	 *            {@code Writer} para o qual a representação Json deve ser
	 *            escrita
	 * @throws JsonIOException
	 *             se houver um problema ao escrever para o {@code Writer}
	 * 
	 * @see com.google.gson.Gson#toJson(Object, Appendable)
	 */
	public static void toJson(Object src, Appendable writer)
			throws JsonIOException {
		getGsonBuilder().create().toJson(src, writer);
	}

}
