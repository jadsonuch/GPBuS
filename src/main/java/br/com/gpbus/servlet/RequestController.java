package br.com.gpbus.servlet;

import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.gpbus.util.DataRequest;

import com.google.gson.Gson;

@WebServlet("/get")
public class RequestController extends HttpServlet{
	
	private static final long serialVersionUID = -7754818904923815254L;
	
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response){

		String json = request.getParameter("json");
		Gson gson = new Gson();
		DataRequest data = gson.fromJson(json, DataRequest.class);
		System.out.println(data.toString());
		//{"src":[-30.0823102,-51.211220000000026],"dst":[-30.0232484,-51.183954400000005],"maxDistance":"0.5"}
		
	}
	
	
}
