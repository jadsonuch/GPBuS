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
	$.ajax({
            url: "/get",
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

    /*
	$.ajax({
            url: "/insert",
            type: "POST",
            data: ({
                json: JSONstring
            }),
            dataType: "html",
            success: function (response) {
                instance.isInserting = false;
                location.reload(true)
            }
    })*/
  
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


/*TENTAR DESCOBRIR PQ NAO ACHOU O PONTO DO T11

	ORIGEM-		-30.023248,-51.183954
14927 -DEST-	-30,0225,-51,1842


$lat = $_GET['lat'];  // latitude of centre of bounding circle in degrees
$lon = $_GET['lon'];  // longitude of centre of bounding circle in degrees
$rad = $_GET['rad'];  // radius of bounding circle in kilometers

$R = 6371;  // earth's radius, km

// first-cut bounding box (in degrees)
$maxLat = $lat + rad2deg($rad/$R);
$minLat = $lat - rad2deg($rad/$R);
// compensate for degrees longitude getting smaller with increasing latitude
$maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
$minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));

// convert origin of filter circle to radians
$lat = deg2rad($lat);
$lon = deg2rad($lon);

Select ID, Postcode, Lat, Lon, 
acos(sin($lat)*sin(radians(Lat)) + cos($lat)*cos(radians(Lat))*cos(radians(Lon)-$lon))*$R As D
From (
Select ID, Postcode, Lat, Lon
From MyTable
Where Lat>$minLat And Lat<$maxLat
And Lon>$minLon And Lon<$maxLon
) As FirstCut 
Where acos(sin($lat)*sin(radians(Lat)) + cos($lat)*cos(radians(Lat))*cos(radians(Lon)-$lon))*$R < $rad
Order by D";

SQL SIDE - CASO TESTE Clemenciano Barnasque 160

Select ID, LAT, LNG, 
acos(sin(-0.5250353595962739)*sin(radians(Lat)) + cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(lng)--0.8938044029631709))*6371 As D
From (
Select ID, Lat, lng
From Pontos
Where Lat>-30.086806808029593 And Lat<-30.077813591970404
And lng>-51.21571660802962 And lng<-51.206723391970435
) As FirstCut 
Where acos(sin(-0.5250353595962739)*sin(radians(Lat)) + cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(lng)--0.8938044029631709))*6371 < 0.5
Order by D
*/ 

/**************
CONSULTA PARA VER OQUE SE REPETE. ( LINHA DIRETA)
SELECT C.* FROM (
SELECT distinct A.ID_LINHAS from linhas_pontos A
where A.id_Pontos in
(15152,15153,3829,10757,5545,3830,972,3854,973,971,970,13287,13286,10758,15151,15150,10755,12492) ) C
where id_linhas in (select distinct B.id_linhas from linhas_pontos B
where B.id_pontos in
(14928,14927,15162,14938,15161,7481,5434,15163,2851,2850,13168,7852,6584,10485,7851,15164))


***/