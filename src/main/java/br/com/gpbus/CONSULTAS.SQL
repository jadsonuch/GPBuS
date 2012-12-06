--CASO 1 e CASO 2
SELECT ID, Lat, LNG,  acos(sin(-0.5250353595962739)*sin(radians(Lat)) +
cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(Lng)--0.8938044029631709))*6371 AS D 
FROM ( SELECT ID, LAT, LNG FROM pontos  WHERE Lat>-30.086806808029593 AND Lat<-30.077813591970404 
AND Lng>-51.21571660802962 AND Lng<-51.206723391970435 ) AS FirstCut  
WHERE acos(sin(-0.5250353595962739)*sin(radians(Lat)) + 
cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(Lng)--0.8938044029631709))*6371 < 0.5 
ORDER by D;	

SELECT ID, Lat, LNG,  acos(sin(-0.5240045367241195)*sin(radians(Lat)) + 
cos(-0.5240045367241195)*cos(radians(Lat))*cos(radians(Lng)--0.8933285284706388))*6371 As D 
FROM ( SELECT ID, LAT, LNG FROM pontos  WHERE Lat>-30.027745008029594 AND Lat<-30.018751791970406 
AND Lng>-51.188451008029595 AND Lng<-51.179457791970414 ) AS FirstCut 
WHERE acos(sin(-0.5240045367241195)*sin(radians(Lat)) + 
cos(-0.5240045367241195)*cos(radians(Lat))*cos(radians(Lng)--0.8933285284706388))*6371 < 0.5 
ORDER by D;


--PEGAR AS LINHAS
SELECT distinct ID_LINHAS
from linhas_pontos
where ID_PONTOS IN (
Select ID As D From ( Select ID, LAT, LNG From pontos  Where Lat>-30.086806808029593 And Lat<-30.077813591970404 And Lng>-51.21571660802962 And Lng<-51.206723391970435 ) As FirstCut  Where acos(sin(-0.5250353595962739)*sin(radians(Lat)) + cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(Lng)--0.8938044029631709))*6371 < 0.5 Order by D
)

--Diferenciando, Caso tenha iguais = rota que faz -- V1
SELECT A.* FROM (
	SELECT distinct ID_LINHAS
	from linhas_pontos
	where ID_PONTOS IN (
		Select ID As D From ( Select ID, LAT, LNG From pontos  Where Lat>-30.086806808029593 And Lat<-30.077813591970404 And Lng>-51.21571660802962 And Lng<-51.206723391970435 ) As FirstCut  Where acos(sin(-0.5250353595962739)*sin(radians(Lat)) + cos(-0.5250353595962739)*cos(radians(Lat))*cos(radians(Lng)--0.8938044029631709))*6371 < 0.5 Order by D
	)) A
	WHERE A.ID_LINHAS IN (
	SELECT distinct ID_LINHAS
	from linhas_pontos
	where ID_PONTOS IN (
			Select ID As D From ( Select ID, LAT, LNG From pontos  Where Lat>-30.027745008029594 And Lat<-30.018751791970406 And Lng>-51.188451008029595 And Lng<-51.179457791970414 ) As FirstCut  Where acos(sin(-0.5240045367241195)*sin(radians(Lat)) + cos(-0.5240045367241195)*cos(radians(Lat))*cos(radians(Lng)--0.8933285284706388))*6371 < 0.5 Order by D
	)) 

/************** 
CONSULTA PARA VER OQUE SE REPETE. ( LINHA DIRETA) -- V2
SELECT C.* FROM (
SELECT distinct A.ID_LINHAS from linhas_pontos A
where A.id_Pontos in
(15152,15153,3829,10757,5545,3830,972,3854,973,971,970,13287,13286,10758,15151,15150,10755,12492) ) C
where id_linhas in (select distinct B.id_linhas from linhas_pontos B
where B.id_pontos in
(14928,14927,15162,14938,15161,7481,5434,15163,2851,2850,13168,7852,6584,10485,7851,15164))

***/
	
