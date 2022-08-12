let pick;

let p1Log = document.getElementById("p1Log");
let p2Log = document.getElementById("p2Log");


let p1ScorePrint = document.getElementById("score1");
let p2ScorePrint = document.getElementById("score2");

const shoot = 0;
const block = 1;
const reload = 2;
const noAmmo = 3;

var socket = io();

function selectShoot() {
	pick = shoot;
	socket.emit('choice', socket.id, pick);
}
	
function selectBlock() {	
	pick = block;
	socket.emit('choice', socket.id, pick);
}

function selectReload() {
	pick = reload;
	socket.emit('choice', socket.id, pick);
}

socket.on('player picks', (p1Pick, p2Pick) => {
	console.log('Player 1 picked ' + p1Pick + " | Player 2 picked " + p2Pick);
	
	//Player 1
	if(p1Pick == shoot) {
		p1Log.innerHTML = "Player 1 shot!";
		console.log('Player 1 picked shoot');
	}
	else if(p1Pick == block) {
		p1Log.innerHTML = "Player 1 blocked!";
		console.log('Player 1 picked block');
	}
	else if(p1Pick == reload) {
		p1Log.innerHTML = "Player 1 reloaded!";
		console.log('Player 1 picked reload');
	}
	else if(p1Pick == noAmmo) {
		p1Log.innerHTML = "Player 1 has no ammo to shoot!";
		console.log('Player 1 picked no ammo');
	}
	
	//Player 2
	if(p2Pick == shoot) {
		p2Log.innerHTML = "Player 2 shot!";
		console.log('Player 2 picked shoot');
	}
	else if(p2Pick == block) {
		p2Log.innerHTML = "Player 2 blocked!";
		console.log('Player 2 picked block');
	}
	else if(p2Pick == reload) {
		p2Log.innerHTML = "Player 2 reloaded!";
		console.log('Player 2 picked reload');
	}
	else if(p2Pick == noAmmo) {
		p2Log.innerHTML = "Player 2 has no ammo to shoot!";

	}
});

socket.on('score', (p1Score, p2Score) => {
	p1ScorePrint.innerHTML = "Player 1 : " + p1Score;
	p2ScorePrint.innerHTML = "Player 2 : " + p2Score;
});
