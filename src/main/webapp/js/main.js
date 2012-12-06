//LÃ³gica da bussca
var map;
var geocoder;

var json = [{
	"lat":-30.1653,	"lng":-51.1542},
{	"lat":-30.1644,	"lng":-51.1523},
{	"lat":-30.1632,	"lng":-51.1507},
{	"lat":-30.1628,	"lng":-51.1565}];

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
		var point = new google.maps.LatLng(51.50, -0.12);
		 if (geocoder) {
		      geocoder.geocode({ "latLng": point }, function (results, status) {
		         if (status == google.maps.GeocoderStatus.OK) {
		            if (results[1]) {
		               console.log(results[1].formatted_address);
		            } 
		            else {
		               console.log("No results found");
		            }
		         } 
		         else {
		            console.log("Geocoder failed due to: " + status);
		         }
		      });
		   }
		
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

function doSearch(from, to, maxDistance){
	console.log("from->"+from);
	console.log("to->"+to);
   	var json = new Object;
    json.src = [from.lat(), from.lng()];
    if (to) {
        json.dst = [to.lat(), to.lng()];
    } else {
        json.dst = null;
        //clearMarker("end")
    }
    json.maxDistance = maxDistance;   
    var JSONstring = JSON.stringify(json);
    console.log(json);
    console.log(JSONstring);
  
    var lat = deg2rad(json.src[0]);
    var lon = deg2rad(json.src[1]);;
    var minLat = cMin(json.src[0], 0.5);
    var minLon = cMin(json.src[1], 0.5);
    var maxLat = cMax(json.src[0], 0.5);
    var maxLon = cMax(json.src[1], 0.5);
    var origemSQL = "Select ID, Lat, LNG, " +
    		" acos(sin("+lat+")*sin(radians(Lat)) +" +
    		" cos("+lat+")*cos(radians(Lat))*cos(radians(Lng)-"+lon+"))*"+6371+" As D" +
    		" From ( Select ID, LAT, LNG From pontos " +
    		" Where Lat>"+minLat+" And Lat<"+maxLat+"" +
    		" And Lng>"+minLon+" And Lng<"+maxLon+" ) As FirstCut " +
    		" Where acos(sin("+lat+")*sin(radians(Lat)) +" +
    		" cos("+lat+")*cos(radians(Lat))*cos(radians(Lng)-"+lon+"))*"+6371+" < "+json.maxDistance+
    		" Order by D;";
    lat = deg2rad(json.dst[0]);
    lon = deg2rad(json.dst[1]);;
    minLat = cMin(json.dst[0], 0.5);
    minLon = cMin(json.dst[1], 0.5);
    maxLat = cMax(json.dst[0], 0.5);
    maxLon = cMax(json.dst[1], 0.5);
    var destinoSQL = "Select ID, Lat, LNG, " +
	" acos(sin("+lat+")*sin(radians(Lat)) +" +
	" cos("+lat+")*cos(radians(Lat))*cos(radians(Lng)-"+lon+"))*"+6371+" As D" +
	" From ( Select ID, LAT, LNG From pontos " +
	" Where Lat>"+minLat+" And Lat<"+maxLat+"" +
	" And Lng>"+minLon+" And Lng<"+maxLon+" ) As FirstCut " +
	" Where acos(sin("+lat+")*sin(radians(Lat)) +" +
	" cos("+lat+")*cos(radians(Lat))*cos(radians(Lng)-"+lon+"))*"+6371+" < "+json.maxDistance+
	" Order by D;";
    console.log("origemSQL -> "+origemSQL);
    console.log("destinoSQL -> "+destinoSQL);
	
  //  =ACOS(SIN(lat1)*SIN(lat2)+COS(lat1)*COS(lat2)*COS(lon2-lon1))*6371
    var minLat = cMin(json.src[0], 0.5);
    var minLon = cMin(json.src[1], 0.5);
    var maxLat = cMax(json.src[0], 0.5);
    var maxLon = cMax(json.src[1], 0.5);
    
    
    var x = "(LNG-("+json.src[1]+")) * cos(("+json.src[0]+"+LAT)/2)";
    var y = "(LAT-("+json.src[0]+"))";
    var d = "sqrt("+x+"*"+x+"+"+y+"*"+y+") * 6371";      
    
    var origem2SQL = "Select ID, Lat, LNG, " + d +
    " As D" +
	" From ( Select ID, LAT, LNG From pontos " +
	" Where Lat>"+minLat+" And Lat<"+maxLat+"" +
	" And Lng>"+minLon+" And Lng<"+maxLon+" ) As FirstCut " +
	" Where " + d + " < "+json.maxDistance*1000+
	" Order by D;";

    var x1 = "(LNG-("+json.dst[1]+")) * cos(("+json.dst[0]+"+LAT)/2)";
    var y1 = "(LAT-("+json.dst[0]+"))";
    var d1 = "sqrt("+x1+"*"+x1+"+"+y1+"*"+y1+") * 6371";
    
    minLat = cMin(json.dst[0], 0.5);
    minLon = cMin(json.dst[1], 0.5);
    maxLat = cMax(json.dst[0], 0.5);
    maxLon = cMax(json.dst[1], 0.5);
    
    var destino2SQL = "Select ID, Lat, LNG, " + d1 +
    " As D" +
	" From ( Select ID, LAT, LNG From pontos " +
	" Where Lat>"+minLat+" And Lat<"+maxLat+"" +
	" And Lng>"+minLon+" And Lng<"+maxLon+" ) As FirstCut " +
	" Where " + d + " < "+json.maxDistance*1000+
	" Order by D;";

    console.log("origem2SQL -> "+origem2SQL);
    console.log("destino2SQL -> "+destino2SQL);
    $.ajax({
            url: "get",
            type: "POST",
            data: ({
                json: JSONstring                
            }),
            dataType: "json",
            success : function(data, textStatus) {
                console.log("OK - RETORNO DO SERVLET");
            },
            error : function(xhr, textStatus, errorThrown) {
            	console.log("ERRO");
            }
    });
        

	
	
    //var JSONstring = $.toJSON(json);
    //console.log(JSONstring);

    //TRABALHAR EM CIMA DO BANCO

    //CONSTRUIR AJAX QUE RETORNA AS PARADAS POSSIVEIS  
    //PEGANDO A ORIGEM E O DESTINO DADO E A DISTANCIA  <-- 50% SQL DONE
    //E ANALISANDO AS PARADAS PROXIMAS SE ESTAO DENTRO DO RAIO DA DISTANCIA DADA.
    //http://www.movable-type.co.uk/scripts/latlong-db.html -- Selecting points within a bounding circle
    //SE ESTIVER EM AMBOS = PARADA ESCOLHIDA ( PARADA DIRETA) <-- 50% SQL DONE. OTIMIZAR
    //SE NAO TIVER, OPCAO PARA CONTINUAR BUSCA ( COMPARAR PARADAS EM COMUM )
    //SENAO TIVER, OPCAO PARA CONTINUAR BUSCA E COMPARAR DISTANCIA ENTRE AS PARADAS (PEGAR TODAS
    //AS PARADAS QUE ESTIVER DENTRO DA DISTANCIA ESTABELECIDA DE CADA CAPARADA E FAZER CRUZAMENTO)
	//RETORNAR UMA LISTA FORMATADA INDICANDO AS POSSIVEIS PARADAS, AO CLICAR NA LISTA, DESENHA NO MAPA A ROTA/AS ROTAS
	//E AS PARADAS NO CASO, AS DE ORIGEM, AS DE DESTINO E A DE CRUZAMENTO (SE HOUVER)

}



//AUX FUNCTIONS and CONSTANTS
var EARTHRADIUS = 6371;
function cMax(variable, soma){
	return variable + rad2deg(soma/EARTHRADIUS);
}
function cMin(variable, subtracao){
	return variable - rad2deg(subtracao/EARTHRADIUS);
}

function rad2deg (angle) {
  return angle * 57.29577951308232; // angle / Math.PI * 180
}

function deg2rad(degrees){
   return (2 * Math.PI * degrees)/360;    
}

//USEFUL
//http://www.movable-type.co.uk/scripts/latlong.html  <-- Calculate distance, bearing and more between Latitude/Longitude points
//http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates


//great circle
function distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1) return Math.round(d)+"km";
    else if (d<=1) return Math.round(d*1000)+"m";
    return d;
}

function distancePitagoras(lat1,lon1,lat2,lon2){
	var dLat = (lat2-lat1);
	var dLon = (lon2-lon1);
	var c = Math.sqrt((dLat*dLat)+(dLon*dLon));
	var R = 6371;
	var d = (c*Math.PI*R)/180;
	return d;
}