package br.com.gpbus.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.gpbus.model.Linha;
import br.com.gpbus.services.PontoService;
import br.com.gpbus.util.DataMultipleResponse;
import br.com.gpbus.util.DataRequest;
import br.com.gpbus.util.JsonBuilder;

@WebServlet("/dual")
public class RequestControllerDual extends HttpServlet {

	private static final long serialVersionUID = 7253095734412020216L;

	@EJB
	private PontoService pontoService;	
	
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException{
				
		String json = request.getParameter("json");
		Gson gson = new Gson();
		DataRequest data = gson.fromJson(json, DataRequest.class);
		System.out.println(data.toString());

		List<Object[]> linhasComPontosEmComum = pontoService.findParadasQueSeCruzam(data.getSrc(),data.getDst());				

		List<DataMultipleResponse> destinos = new ArrayList<DataMultipleResponse>();
		for (Object[] l : linhasComPontosEmComum){
			
			System.out.println("\t" + l[0] + "\t" + l[1]);
			System.out.println("\t" + l[1] + "\t" + l[2]);
		}
		
		
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(String.format(
				"{\"linhas\":%s}",
				JsonBuilder.toJson(linhasComPontosEmComum)));	
	}
	
	
}
