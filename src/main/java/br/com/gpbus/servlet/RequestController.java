package br.com.gpbus.servlet;

import java.io.IOException;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.gpbus.Controller.BuscaController;
import br.com.gpbus.model.Linha;
import br.com.gpbus.util.DataRequest;
import br.com.gpbus.util.JsonBuilder;

import com.google.gson.Gson;

@WebServlet("/get")
public class RequestController extends HttpServlet{
	
	private static final long serialVersionUID = -7754818904923815254L;
	
	@EJB
	BuscaController buscaController;
	
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException{

		String json = request.getParameter("json");
		Gson gson = new Gson();
		DataRequest data = gson.fromJson(json, DataRequest.class);
		//{"src":[-30.0823102,-51.211220000000026],"dst":[-30.0232484,-51.183954400000005],"maxDistance":"0.5"}
		
		List<Linha> linhasIguais = buscaController.findLinhasIguais(data);
		List<Linha> linhasOrigem = buscaController.getLinhasOrigem();
		List<Linha> linhasDestino = buscaController.getLinhasDestino();	
		System.out.println(linhasDestino.size());
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(String.format(
				"{\"linhas\":%s,\"linhasOrigem\":%s,\"linhasDestino\":%s}",
				JsonBuilder.toJson(linhasIguais),
				JsonBuilder.toJson(linhasOrigem),
				JsonBuilder.toJson(linhasDestino)));		
	}		
}
