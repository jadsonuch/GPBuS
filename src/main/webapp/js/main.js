//Lógica da bussca
var map;
var geocoder;

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
var searchInProgress = null;
var isSearching = false;

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
            			buildResultsBlock($("#resposta"), linhasEmComum); 			
            		}else{
            			alert("0 rotas encontradas. Deseja procurar por baldiação?");
            		}     		
            	}                 
            	console.log("OK - RETORNO DO SERVLET");                
            },
            error : function(xhr, textStatus, errorThrown) {
            	console.log("ERRO");
            }
    });
    $("#resposta").show();
    $("#resposta").html("<img src='img/loading.gif' style='vertical-align: middle;'/> Buscando..."); 	
}

function buildResultsBlock(element,content){
	element.html("<div class='header'>Linhas<button type='button' class='close' onclick='closeResultsBlock();'>&times;</button></div>");            			            			
	element.append("<ul id='items'>");            			            			            			
	for(var i = 0 ; i< linhasEmComum.length; i++){
		var li = $("<li>");
		 li.html("<a href='#'>"+linhasEmComum[i].codigo + " " + linhasEmComum[i].nome + "</a>");            				 
		 li.appendTo($("ul#items"));		
	}            				            			            			            
	element.append("</br>");            			            		            			
	$('ul#items').paginate({
			step:10                
	});    
}

function closeResultsBlock() {
	$("#resposta").fadeOut(300);	
}; 
