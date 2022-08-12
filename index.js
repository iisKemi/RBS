//Networking stuff
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const path = require('path');
const express = require('express');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Mizgame.html');
});

//Game variables
let player1, player2, player1Pick, player2Pick, winner;

let player1Ammo = 0;
let player2Ammo = 0;

const shoot = 0;
const block = 1;
const reload = 2;
const noAmmo = 3;

let p1Score = 0;
let p2Score = 0;

let sock;

//Functions

io.on('connection', (socket) => {
	console.log('User joined: ' + socket.id);
	
	sock = socket;
	whoIsWho(sock);
	socket.on('choice', (id, pick) => {
		choiceCapture(id, pick);
	});
});

function whoIsWho(socket) {
	if(!player1) {
		player1 = sock.id;
		console.log('player 1 :' + player1);
	}
	else if(!player2) {
		player2 = sock.id;
		console.log('player 2 :' + player2);
	}
}

function choiceCapture(id, pick) {
	if(id == player1) {
		player1Pick = pick;
		console.log('Player 1 picked ' + player1Pick);
	}
	if(id == player2) {
		player2Pick = pick;
		console.log('Player 2 picked ' + player2Pick);
	}
	if([0, 1, 2, 3, 4].includes(player1Pick) && [0, 1, 2, 3, 4].includes(player2Pick)) {
		console.log('Confirm : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		checkAmmo(player1Pick, player2Pick);
		player1Pick = null;
		player2Pick = null;
	}
}

function checkAmmo(player1Pick, player2Pick) {
	var p1Pick = player1Pick;
	var p2Pick = player2Pick;
	
	//Check to see if players have Ammo
	if(player1Ammo == 0) {
		p1Pick == noAmmo;
	}
	if(player2Ammo == 0) {
		p1Pick == noAmmo;
	}
	
	console.log('After Ammo check : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
	
	if(p1Pick == shoot) {
		shootCalcs(p1Pick, p2Pick);
	}
	else if(p1Pick == block) {
		blockCalcs(p1Pick, p2Pick);
	}
	else if(p1Pick == reload || p1Pick == noAmmo) {
		reloadNAmmoCalcs(p1Pick, p2Pick);
	}
	
	console.log('Final check : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
	io.emit('player picks', p1Pick, p2Pick);
}

function shootCalcs(p1Pick, p2Pick) {
	if(p2Pick == shoot) {
		console.log('Shoot check 1 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		death(0);
	}
	if(p2Pick == block) {
		console.log('Shoot check 2 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		player1Ammo -= 1;
	}
	if(p2Pick == reload || p2Pick == noAmmo) {
		console.log('Shoot check 3 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		death(1);
	}
}

function blockCalcs(p1Pick, p2Pick) {
	if(p2Pick == shoot) {
		console.log('Block check 1 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		player2Ammo -= 1;
	}
	if(p2Pick == reload) {
		console.log('Block check 2 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		p2Ammo += 1;
	}
}

function reloadNAmmoCalcs(p1Pick, p2Pick) {
	if(p2Pick == shoot) {
		console.log('ReloadNAmmo check 1 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		death(2);
	}
	if(p2Pick == block || p2Pick == reload || p2Pick == noAmmo) {
		console.log('ReloadNAmmo check 2 : Player 1 picked ' + player1Pick + ' | Player 2 picked ' + player2Pick);
		player1Ammo += 1;
	}
}


function death(result) {
	if(result == 0) {
		console.log('Both players shot. Tie');
		p1Score += 1;
		p2Score += 1;
	}
	if(result == 1) {
		console.log('Player 1 wins');
		p1Score += 1;
	}
	if(result == 2) {
		console.log('Player 2 wins');
		p2Score += 1;
	}
	
	console.log('Player 1 score ' + p1Score + ' | Player 2 score ' + p2Score);
	io.emit('score', p1Score, p2Score);
	
	player1Ammo = 0;
	player2Ammo = 0;
	console.log('Reset ammo: ' + 'Player 1 ' + player1Ammo + ' | Player 2 ' + player2Ammo); 
	
}

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});