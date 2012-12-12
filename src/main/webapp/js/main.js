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
var linhasTeste;
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
            		linhasTeste = data;
            		console.log("linhasEmComum.length"+linhasEmComum.length);
            		if(linhasEmComum.length > 0){                		    
            			console.log("entrou no > 0");
            			buildResultsBlock($("#resposta"), linhasEmComum); 			
            		}else{
            			console.log("entrou no < 0");
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
        		linhasTeste = data;
        		console.log("DUAL OK"); 		
        	}                                 
        },
        error : function(xhr, textStatus, errorThrown) {
        	console.log("ERRO - DUAL");
        }
	});
    $("#resposta").addClass("alert-info").removeClass("alert-block");
	$("#resposta").html("<img src='img/loading.gif' style='vertical-align: middle;'/> Buscando por baldiação..."); 	
    
}


function buildResultsBlock(element,content){
	element.html("<div class='header'>Linhas<button type='button' class='close' onclick='closeResultsBlock();'>&times;</button></div>");            			            			
	element.append("<ul id='items'>");            			            			            			
	for(var i = 0 ; i< content.length; i++){
		var li = $("<li>");
		 li.html("<a href='#'>"+content[i].codigo + " " + content[i].nome + "</a>");            				 
		 li.appendTo($("ul#items"));		
	}            				            			            			            
	element.append("</br>");            			            		            			
	if(content.length > 10){
		$('ul#items').paginate({
			step:10                
		});    		
	}
}

function closeResultsBlock() {
	$("#resposta").fadeOut(300);	
}; 
