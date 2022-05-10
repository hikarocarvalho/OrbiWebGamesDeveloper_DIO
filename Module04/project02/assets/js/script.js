function start() {

	$("#start").hide();
	
	$("#game-background").append("<div id='player' class='player anima1'></div>");
	$("#game-background").append("<div id='enemy' class='enemy anima2'></div>");
	$("#game-background").append("<div id='second-enemy' class='second-enemy'></div>");
	$("#game-background").append("<div id='friend' class='friend anima3' ></div>");
	$("#game-background").append("<div id='placar'></div>");
	$("#game-background").append("<div id='energy'></div>");
	

	var fimdejogo=false;

	var TECLA = {
		W: 87,
		S: 83,
		D: 68
	}

	var pontos=0;
	var salvos=0;
	var perdidos=0;
	var energiaAtual=3;	

	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");

	var jogo = {}

	function movefundo() {
		esquerda = parseInt($("#game-background").css("background-position"));
		$("#game-background").css("background-position",esquerda-3);
	} 

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();	
		moveamigo();
		colisao();
		placar();
		energia();
		musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
		musica.play();
	} 

	jogo.pressionou = [];

	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	
	$(document).keyup(function(e){
	   jogo.pressionou[e.which] = false;
	});
	
	function movejogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#player").css("top"));
			if(topo>=10){
				$("#player").css("top",topo-10);
			}
		
		}
		
		if (jogo.pressionou[TECLA.S]) {
			
			var topo = parseInt($("#player").css("top"));
			
			if(topo<parseInt(window.screen.height-390)){
				$("#player").css("top",topo+10);	
			}
		}
		
		if (jogo.pressionou[TECLA.D]) {
			disparo();	
		}
	
	}

	function moveinimigo1() {

		posicaoX = parseInt($("#enemy").css("left"));
		$("#enemy").css("right","auto");
		$("#enemy").css("left",posicaoX-velocidade);
		$("#enemy").css("top",posicaoY);
			
		if (posicaoX<=-256) {
			posicaoY = parseInt(Math.random() * 334);
			$("#enemy").css("left","auto");
			$("#enemy").css("right",-256);
			$("#enemy").css("top",posicaoY);
				
		}
	}

	function moveinimigo2() {
        posicaoX = parseInt($("#second-enemy").css("left"));
		$("#second-enemy").css("right","auto");
		$("#second-enemy").css("left",posicaoX-5);
				
		if (posicaoX<=-165) {	
			$("#second-enemy").css("left","auto");
			$("#second-enemy").css("right",-165);			
		}
	}

	function moveamigo() {
	
		posicaoX = parseInt($("#friend").css("left"));
		$("#friend").css("left",posicaoX+1);
					

		if (posicaoX>parseInt(window.screen.width-200)) {
			$("#friend").css("left",0);
		}
	
	}

	var velocidade=7;
	var posicaoY = parseInt(Math.random() * 334);
	var podeAtirar=true;
	movejogador();

	jogo.timer = setInterval(loop,30);

	function disparo() {
	
		if (podeAtirar==true) {
			somDisparo.play();
			podeAtirar=false;
			
			topo = parseInt($("#player").css("top"))
			posicaoX= parseInt($("#player").css("left"))
			tiroX = posicaoX + 190;
			topoTiro=topo+37;
			$("#game-background").append("<div id='shoot' class='shoot'></div");
			$("#shoot").css("top",topoTiro);
			$("#shoot").css("left",tiroX);
			
			var tempoDisparo=window.setInterval(executaDisparo, 5);
		
		}
	 
			function executaDisparo() {
			posicaoX = parseInt($("#shoot").css("left"));
			$("#shoot").css("left",posicaoX+15); 
	
			if (posicaoX>parseInt(window.screen.width-200)) {
							
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#shoot").remove();
				podeAtirar=true;
						
			}
		}
	}
	function colisao() {
		var colisionPlayerEnemy = ($("#player").collision($("#enemy")));
		var colisionSecondEnemy = ($("#player").collision($("#second-enemy")));
		var colisionShootEnemy = ($("#shoot").collision($("#enemy")));
		var colisionShootSecondEnemy = ($("#shoot").collision($("#second-enemy")));
		var colisionPlayerFriend = ($("#player").collision($("#friend")));
		var colisionEnemyFriend = ($("#second-enemy").collision($("#friend")));

		if (colisionPlayerEnemy.length>0) {
		
			inimigo1X = parseInt($("#enemy").css("left"));
			inimigo1Y = parseInt($("#enemy").css("top"));
			explosao1(inimigo1X,inimigo1Y);
			posicaoY = parseInt(Math.random() * 334);
			$("#enemy").css("left",parseInt(window.screen.width-200));
			$("#enemy").css("top",posicaoY);
			energiaAtual--;
		}
		if (colisionSecondEnemy.length>0) {
	
			inimigo2X = parseInt($("#second-enemy").css("left"));
			inimigo2Y = parseInt($("#second-enemy").css("top"));
			explosao2(inimigo2X,inimigo2Y);
					
			$("#second-enemy").remove();

			reposicionaInimigo2();
			energiaAtual--;
				
		}
		if (colisionShootEnemy.length>0) {
		
		
			inimigo1X = parseInt($("#enemy").css("left"));
			inimigo1Y = parseInt($("#enemy").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			$("#shoot").css("left",950);
				
			posicaoY = parseInt(Math.random() * 334);
			$("#enemy").css("left",parseInt(window.screen.width-200));
			$("#enemy").css("top",posicaoY);
			
			pontos=pontos+100;
			velocidade=velocidade+0.3;
		}
		if (colisionShootSecondEnemy.length>0) {
		
			inimigo2X = parseInt($("#second-enemy").css("left"));
			inimigo2Y = parseInt($("#second-enemy").css("top"));
			$("#second-enemy").remove();
		
			explosao2(inimigo2X,inimigo2Y);
			$("#shoot").css("left",950);
			
			reposicionaInimigo2();
			pontos=pontos+50;
				
		}
		if (colisionPlayerFriend.length>0) {
			somResgate.play();
			reposicionaAmigo();
			$("#friend").remove();
			salvos++;
		}
		if (colisionEnemyFriend.length>0) {
	    
			amigoX = parseInt($("#friend").css("left"));
			amigoY = parseInt($("#friend").css("top"));
			explosao3(amigoX,amigoY);
			$("#friend").remove();
					
			reposicionaAmigo();
			perdidos++;
					
		}
	
	}

	function explosao2(inimigo2X,inimigo2Y) {
		somExplosao.play();
		$("#game-background").append("<div id='second-explosion'></div");
		$("#second-explosion").css("background-image", "url(./../assets/imgs/explosao.png)");
		var div2=$("#second-explosion");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({
			width:250, height:87, opacity:0.8	
		}, "fast");
		
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}	
	} 
	function explosao1(inimigo1X,inimigo1Y) {
		somExplosao.play();
		$("#game-background").append("<div id='explosion' class='explosion'></div>");
		$("#explosion").css("background-image", "url(./../assets/imgs/explosao.png)");
		var div=$("#explosion");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({
			width:250, height:87, opacity:0.8	
		}, "fast");
		
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
		
			function removeExplosao() {
				
				div.remove();
				window.clearInterval(tempoExplosao);
				tempoExplosao=null;
				
			}
			
		}

	function explosao3(amigoX,amigoY) {
		somPerdido.play();
		$("#game-background").append("<div id='third-explosion' class='anima4'></div>");
		$("#third-explosion").css("top",amigoY);
		$("#third-explosion").css("left",amigoX);
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		function resetaExplosao3() {
			$("#third-explosion").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3=null;
					
		}
	}

	function reposicionaInimigo2() {
	
		var tempoColisao4=window.setInterval(reposiciona4, 3000);
				
		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
					
			if (fimdejogo==false) {
					
				$("#game-background").append("<div id='second-enemy' class='second-enemy'></div>");
				$("#second-enemy").css("left",parseInt(window.screen.width-200));
				$("#second-enemy").css("top","70%");
			}
					
		}	
	}
	function reposicionaAmigo() {
	
			var tempoAmigo=window.setInterval(reposiciona6, 3000);
			
				function reposiciona6() {
				window.clearInterval(tempoAmigo);
				tempoAmigo=null;
				
				if (fimdejogo==false) {
				
					$("#game-background").append("<div id='friend' class='friend anima3' ></div>");
				
				}
				
			}
	}

	function placar() {
	
			$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
			
	}

	function energia() {
	
			if (energiaAtual==3) {
				
				$("#energy").css("background-image", "url(./../assets/imgs/energia3.png)");
			}
		
			if (energiaAtual==2) {
				
				$("#energy").css("background-image", "url(./../assets/imgs/energia2.png)");
			}
		
			if (energiaAtual==1) {
				
				$("#energy").css("background-image", "url(./../assets/imgs/energia1.png)");
			}
		
			if (energiaAtual==0) {
				
				$("#energy").css("background-image", "url(./../assets/imgs/energia0.png)");
				
				gameOver();
			}
		
	}
	function gameOver() {
		fimdejogo=true;
		musica.pause();
		somGameover.play();
			
		window.clearInterval(jogo.timer);
		jogo.timer=null;
			
		$("#player").remove();
		$("#enemy").remove();
		$("#second-enemy").remove();
		$("#friend").remove();
			
		$("#game-background").append("<div id='fim'></div>");
			
		$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	}
}

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
}