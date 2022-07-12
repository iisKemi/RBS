let p1Pick, whoKilled,p2Pick;
let p1ammo = 0;
let p2ammo = 0;
let turn = 0;


let p1Score = 0;
let p2Score = 0;



function selectShoot() {
	
	cpuPick = cpu();
	if(p1ammo == 0) {
		console.log("No ammo!")
		if (cpuPick == 0) {
			console.log("P2 shoots you!");
			document.getElementById("logs").innerHTML = "No ammo! : P2 shoots you!";
			death(2);
		}
		else if (cpuPick == 1) {
			console.log("P2 Blocked!")
			document.getElementById("logs").innerHTML = "No ammo! : P2 Blocked!";
			}
		else if (cpuPick == 2) {
			console.log("P2 Reloaded!");
			document.getElementById("logs").innerHTML = "No ammo! : P2 Reloaded!";
			
			}
	}
		else {
			p1ammo -= 1;
			if (cpuPick == 0) {
				console.log("You shot each other!");
				document.getElementById("logs").innerHTML = "You shot each other!";
				death(0);
			}
			else if (cpuPick == 1) {
				console.log("P2 Blocked!")
				document.getElementById("logs").innerHTML = "P2 Blocked!";
			}
			else if (cpuPick == 2) {
				console.log("P2 Killed while reloading!");
				document.getElementById("logs").innerHTML = "P2 Killed while reloading!";
				death(1);
			}
		}
	}
	

function selectBlock() {	
	cpuPick = cpu();
	console.log(cpuPick + " Block");
	if (cpuPick == 0) {
		console.log("Blocked p2 shot!");
		document.getElementById("logs").innerHTML = "Blocked p2 shot!";
	}
	else if (cpuPick == 1) {
		console.log("Both Blocked!")
		document.getElementById("logs").innerHTML = "Both Blocked!";
	}
	else if (cpuPick == 2) {
		console.log("P2 Reloaded!");
		document.getElementById("logs").innerHTML = "P2 Reloaded!";
	}
	
}

function selectReload() {
	cpuPick = cpu();
	p1ammo += 1;
	if (cpuPick == 0) {
		console.log("P2 shoots you!");
		document.getElementById("logs").innerHTML = "P2 shoots you!";
		death(2);
	}
	else if (cpuPick == 1) {
		console.log("P2 blocked!")
		document.getElementById("logs").innerHTML = "P2 blocked!";
	}
	else if (cpuPick == 2) {
		console.log("P2 Reloaded!");
		document.getElementById("logs").innerHTML = "P2 Reloaded!";
	}
	
}


function death(whoKilled) {
	if (whoKilled == 1) {
		p1Score += 1;
	}
	else if (whoKilled == 2) {
		p2Score += 1;
	}
	else {
		p1Score += 1;
		p2Score += 1;
	}
	
	document.getElementById("score1").innerHTML = "Player 1 Score : " + p1Score;
	document.getElementById("score2").innerHTML = "Player 2 Score : " + p2Score;
	
	console.log("Player 1 Score : " + p1Score);
	console.log("Player 2 Score : " + p2Score);
	p1ammo = 0;
	p2ammo = 0;
}

function cpu() {
	if (p2ammo > 0) {
		p2Pick = Math.floor(Math.random() * 3);
		if(p2Pick == 0) {
			p2ammo -= 1;
		}
		else if(p2Pick == 2) {
			p2ammo += 1;
		}
		return p2Pick;
	}
	else if (p2ammo == 0) {
		p2Pick = Math.floor(Math.random() * 2 + 1);
		if(p2Pick == 2) {
			p2ammo += 1;
		}
		return p2Pick;
		}
}
