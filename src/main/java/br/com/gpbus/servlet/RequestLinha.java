package br.com.gpbus.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.gpbus.model.Linha;
import br.com.gpbus.services.LinhaService;
import br.com.gpbus.util.DataRequest;
import br.com.gpbus.util.JsonBuilder;

import com.google.gson.Gson;

@WebServlet("/find")
public class RequestLinha extends HttpServlet{ /**
	 * 
	 */
	private static final long serialVersionUID = 1385741887590461040L;

	@EJB
	private LinhaService linhaService;	
	
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		String json = request.getParameter("json");
		Gson gson = new Gson();
		DataRequest data = gson.fromJson(json, DataRequest.class);
		Linha linha = null;
		List<Linha> listLinhas = null;
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		if(data.getDst() != null){
			int valSrc = data.getSrc().get(0).intValue();
			List<Integer> destinos = new ArrayList<Integer>();
			destinos.add(valSrc);
			for(Float f : data.getDst()){
				destinos.add(f.intValue());
			}
			listLinhas = linhaService.findLinha(destinos);			
			
			String buildJson = "";
			for(Linha l : listLinhas){
				buildJson = buildJson + generateJson(l) + ",";
			}
			buildJson = buildJson.substring(0,buildJson.length()-1);			
			System.out.println("buildJson"+buildJson);
			response.getWriter().write(String.format(
					"{\"linha\":[%s]}",
					buildJson));
		}else{
			int value = data.getSrc().get(0).intValue();
			linha = linhaService.findLinha(value);
			
			response.getWriter().write(String.format(
					"{\"linha\":[%s]}",
					generateJson(linha)));			
		}							
	}

	public String generateJson(Linha l){
		String doJson = JsonBuilder.toJson(l);
		doJson = doJson.replace("}", ",\"pontos\": " + JsonBuilder.toJson(l.getPontoMapas())+"}");
		return doJson;		
	}

}
