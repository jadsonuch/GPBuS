//Lógica da bussca
var map;
var geocoder;
var COLORS = ["#4bb2c5","#eaa228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f", "#ff5800","#0085cc","#c747a3","#cddf54","#fbd178","#26b4e3","#bd70c7"];

$("#btnBusca").click(function(){            
	console.log("clicou");
	var overflow = $(".nav-collapse.collapse").css('overflow');
	if( overflow === 'hidden'){
		$(".collapse").collapse('toggle');
	}
	getAddress();
});

//funcao para encaminhar a busca
function getAddress() {		
	var maxDist = "0.5";		
	if (geocoder) {	
		geocoder.geocode( {"address": $("#origem").val()}, function(rOrigem, sOrigem) {
			if(sOrigem == google.maps.GeocoderStatus.OK) {
				geocoder.geocode( {"address": $("#destino").val()}, function(rDestino, sDestino) {					
					if(sDestino == google.maps.GeocoderStatus.OK) {
						var from = rOrigem[0].geometry.location;
						var to = rDestino[0].geometry.location;													
						doSearch(from, to, maxDist);
					}
					else {						
						alert("Endereço não encontrado.");
						//var from = rOrigem[0].geometry.location;
						//page.search(from, null, maxDist);
					}
				});
			}
		});
	 }
}
var linhasEmComum;
var linhasTeste;
var searchInProgress = null;
var isSearching = false;

function clearMarker(marker) {
	if ((marker == "start") && searchMarker.start) {
		searchMarker.start.setMap(null);
		searchMarker.start = null;
	} else 	if ((marker == "end") && searchMarker.end) {
		searchMarker.end.setMap(null);
		searchMarker.end = null;
	}
}; 

function doSearch(from, to, maxDistance){	
	//Vai verificar se existe uma busca sendo feita. Caso exista, vai para-la.
	if (isSearching) {
		if (searchInProgress) {
			searchInProgress.abort();
			searchInProgress = null;
			isSearching = false;
		}
	} 
	isSearching = true;		
   	var json = new Object;
    json.src = [from.lat(), from.lng()];
    if (to) {
        json.dst = [to.lat(), to.lng()];
    } else {
        json.dst = null;
    }
    
    clearMarker("start");
    searchMarker.start = new google.maps.Marker({
    	position: from,
    	title: "Origem",
    	map: map
    	});
   
    clearMarker("end");
    
    searchMarker.end = new google.maps.Marker({
	    position: to,
	    title: "Destino",
	    map: map
    });
    
    json.maxDistance = maxDistance;       
    var JSONstring = JSON.stringify(json);
    
    searchInProgress = $.ajax({
            url: "get",
            type: "POST",
            data: ({
                json: JSONstring                
            }),
            dataType: "json",
            success : function(data, textStatus) {            	
            	if (isSearching) {
            		isSearching = false;
            		linhasEmComum = data.linhas;            		
            		if(linhasEmComum.length > 0){                		    
            			buildResultsBlock($("#resposta"), linhasEmComum, 1); 			
            		}else{
            			$("#resposta").addClass("alert-block").removeClass("alert-info");
            			$("#resposta").html("<p>Nenhuma conex&atilde;o direta encontrada. " +
            								"Deseja tentar procurar por uma baldia&ccedil;&atilde;o?</p>" +
            								"</br>");
            			$("#resposta").append('<div id="btnToolbar" style="margin: 0;" class="btn-toolbar"></div>');
            					
            			$("<button id='btnBaldiacao' class='btn btn-primary'>Sim</button>")
            				.appendTo($("#btnToolbar"))
            				.click(function(){
            					doSearchDual(data.linhasOrigem,data.linhasDestino,maxDistance);
            					console.log("Clicou Para continuar a busca");
            				});
            			$("<button id='btnCancelBaldiacao' class='btn btn-danger'>N&atilde;o</button>")
            			    .appendTo($("#btnToolbar"))
            				.click(function(){
            					closeResultsBlock();
            				});
            		}     		
            	}                                 
            },
            error : function(xhr, textStatus, errorThrown) {
            	console.log("ERRO");
            }
    });
    $("#resposta").show();
    $("#resposta").html("<img src='img/loading.gif' style='vertical-align: middle;'/> Buscando..."); 	
}

var testDual;
function doSearchDual(origem,destino,maxDistance){
	
	//Vai verificar se existe uma busca sendo feita. Caso exista, vai para-la.
	if (isSearching) {
		if (searchInProgress) {
			searchInProgress.abort();
			searchInProgress = null;
			isSearching = false;
		}
	} 
	isSearching = true;		
   	var json = new Object;
   	var src = [];
   	var dst = [];
    for(var i=0;i<origem.length;i++){
    	src.push(origem[i].id);
    }
   	json.src = src;
    if (destino) {
        for(var i=0;i<destino.length;i++){
        	dst.push(destino[i].id);
        }
        json.dst = dst;
    } 
    json.maxDistance = maxDistance;   
    var JSONstring = JSON.stringify(json);
	console.log(JSONstring);
    searchInProgress = $.ajax({
        url: "dual",
        type: "POST",
        data: ({
            json: JSONstring                
        }),
        dataType: "json",
        success : function(data, textStatus) {            	
        	if (isSearching) {
        		isSearching = false;
        		testDual = data;
        		linhasTeste = data.linhas;	
        		if(linhasTeste.length > 0){                		    
        			buildResultsBlock($("#resposta"), linhasTeste, 2); 			
        		}
        	}                                 
        },
        error : function(xhr, textStatus, errorThrown) {
        	console.log("ERRO - DUAL");
        }
	});
    $("#resposta").addClass("alert-info").removeClass("alert-block");
	$("#resposta").html("<img src='img/loading.gif' style='vertical-align: middle;'/> Buscando por baldiação..."); 	
    
}

var auxTestLinha;
var polyLines = new Array();
function buildResultsBlock(element,content,mode){
	element.html("<div class='header'>Linhas<button type='button' class='close' onclick='closeResultsBlock();'>&times;</button></div>");	
	element.append("<ul id='items'>");            			            			            			
	if(mode == 1){		
		$.each(content, function(index, element) {
		//for(var i = 0 ; i< content.length; i++){
		 	
			var json = new Object;
		    json.src = [content[index].id];
	        json.dst = null;
	        json.maxDistance = null;
	        var JSONstring = JSON.stringify(json);
	        
			$("<li><a href='#'>"+content[index].codigo + " " + content[index].nome +"</a></li>")
		    .appendTo($("ul#items"))
			.click(function(){
				
				$.ajax({
			        url: "find",
			        type: "POST",
			        data: ({
			            json: JSONstring                
			        }),
			        dataType: "json",
			        success : function(data, textStatus) {     
			        	
			        	for (var i = 0; i < polyLines.length; i++) {
			        		polyLines[i].setMap(null);
			        	} 
			        	polyLines = new Array();
			        	
			        	
			        	auxTestLinha = data;
			        	var aux = data.linha[0].pontos;
			        	console.log("Pegou LINHA");	
			        	
			        	 var c = COLORS[0];
			        	 //var c = COLORS[seriesIndex % COLORS.length];
			        	 
			        	 var lineOptions = {
			        			 strokeColor: c,
			        			 strokeOpacity: 0.5,
			        			 strokeWeight: 5
			        			 };
			        	 
			        	 var pl = new google.maps.Polyline(lineOptions);
			        	 pl.setMap(map);
	        			 polyLines.push(pl);
			        	 var path = pl.getPath();
			        	 
			        	 for (var i = 0; i < aux.length; i++) {
			        		 path.push(new google.maps.LatLng(aux[i].lat, aux[i].lng));
			        	 }        	
			        	
			        },
			        error : function(xhr, textStatus, errorThrown) {
			        	console.log("ERRO - getLINHA");
			        }
				});
				
			});
		});         				            			            			            		
	}else{
		$.each(content, function(index, element) {
			var json = new Object;
		    json.src = [content[index].id];
		    console.log("element.id"+element.id);
	        json.dst = [content[index].did];
	        console.log("element.did"+element.did);
	        json.maxDistance = null;
	        var JSONstring = JSON.stringify(json);	  
	        console.log("mostrando resultado"+JSONstring);
			$("<li><a href='#'>"+content[index].codigo + " " + content[index].dcodigo + "</a></li>")
		    .appendTo($("ul#items"))
			.click(function(){
				console.log("ESCOLHIDO"+JSONstring);	  
				$.ajax({
			        url: "find",
			        type: "POST",
			        data: ({
			            json: JSONstring                
			        }),
			        dataType: "json",
			        success : function(data, textStatus) {            	
			        	auxTestLinha = data;
			        	console.log("Pegou LINHA");		
			        	
			        	for (var i = 0; i < polyLines.length; i++) {
			        		polyLines[i].setMap(null);
			        	} 
			        	polyLines = new Array();
			        	
			        	
			        	auxTestLinha = data;
			        	var auxLinha = data.linha;
			        	
			        	for (var j = 0; j < auxLinha.length; j++) {
			        		
			        		var aux = data.linha[j].pontos;
				        	console.log("Pegou LINHA");	
				        	
				        	 //var c = COLORS[0];
				        	 var c = COLORS[j % COLORS.length];
				        	 
				        	 var lineOptions = {
				        			 strokeColor: c,
				        			 strokeOpacity: 0.5,
				        			 strokeWeight: 5
				        			 };
				        	 
				        	 var pl = new google.maps.Polyline(lineOptions);
				        	 pl.setMap(map);
		        			 polyLines.push(pl);
				        	 var path = pl.getPath();
				        	 
				        	 for (var i = 0; i < aux.length; i++) {
				        		 path.push(new google.maps.LatLng(aux[i].lat, aux[i].lng));
				        	 }     			        
			        	}
			        },
			        error : function(xhr, textStatus, errorThrown) {
			        	console.log("ERRO - getLINHA");
			        }
				});				
			});

		});
		
		//for(var i = 0 ; i< content.length; i++){
						
						
			/*var li = $("<li>");
			 li.html("<a href='#'>"+content[i].codigo + " " + content[i].dcodigo + "</a>");            				 
			 li.appendTo($("ul#items"));	*/	
		//}    
	}
	element.append("</br>");            			            		            			
	if(content.length > 10){
		$('ul#items').paginate({
			step:10                
		});    		
	}
}

var searchMarker = {
	start: null,
	end: null
}; 

function closeResultsBlock() {
	$("#resposta").fadeOut(300);	
}; 
