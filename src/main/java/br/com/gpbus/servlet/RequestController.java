package br.com.gpbus.servlet;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.gpbus.model.Linha;
import br.com.gpbus.services.PontoService;
import br.com.gpbus.util.DataRequest;

import com.google.gson.Gson;

@WebServlet("/get")
public class RequestController extends HttpServlet{
	
	private static final long serialVersionUID = -7754818904923815254L;
	
	@EJB
	private PontoService pontoService;	
	
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response){

		String json = request.getParameter("json");
		Gson gson = new Gson();
		DataRequest data = gson.fromJson(json, DataRequest.class);
		System.out.println(data.toString());
		//{"src":[-30.0823102,-51.211220000000026],"dst":[-30.0232484,-51.183954400000005],"maxDistance":"0.5"}
			
		
		List<Linha> linhasOrigem = pontoService.findLinhasNearPonto(data.getSrc().get(0), data.getSrc().get(1));
		List<Integer> origem = new ArrayList<Integer>();
		System.out.println("\t---------------------------------------------");
		for (Linha l : linhasOrigem) {
			//System.out.println("\t" + l.toString());
			//System.out.println(l.getId());
			origem.add(l.getId());
		}
		List<Linha> linhasDestino = pontoService.findLinhasNearPonto(data.getDst().get(0), data.getDst().get(1));
		List<Integer> destino = new ArrayList<Integer>();
		System.out.println("\t---------------------------------------------");
		for (Linha s : linhasDestino){
			//System.out.println("\t" + s.toString());
			//System.out.println(s.getId());
			destino.add(s.getId());
		}
		List<Linha> linhasIguais = new ArrayList<Linha>(linhasOrigem);
		linhasIguais.retainAll(linhasDestino);
		System.out.println("\t---------------------------------------------");
		for (Linha l : linhasIguais){
			System.out.println("\t" + l.toString());
		}
		
		//return ids LinhaOrigem
		//return ids LinhasDestino
		//return ids LinhasIguais
		List<Object[]> linhasComPontosEmComum = pontoService.findParadasQueSeCruzam(origem,destino);

		
	}
	
	
}
