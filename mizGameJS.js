let p1Pick, whoKilled,p2Pick,cpuPick;
let p1Ammo = 0;
let p2Ammo = 0;
let turn = 0;

let p1Log = document.getElementById("p1Log");

let p1ScorePrint = document.getElementById("score1");
let p2ScorePrint = document.getElementById("score2");

const shoot = 0;
const block = 1;
const reload = 2;
const noAmmo = 3;


let p1Score = 0;
let p2Score = 0;



function selectShoot() {
	p1Pick = shoot;
	cpuPick = cpu();
	p1Shoot(p1Pick, cpuPick);
}
	

function selectBlock() {	
	p1Pick = block;
	cpuPick = cpu();
	p1Log.innerHTML = "Player 1 blocked!";
}

function selectReload() {
	p1Pick = reload;
	cpuPick = cpu();
	p1Reload(p1Pick, cpuPick);
}

function p1Shoot(p1Pick,cpuPick) {
	if(p1Ammo >= 1) {
		p1Log.innerHTML = "Player 1 shoots!";
		if(p1Pick == shoot && cpuPick == shoot) {
			death(0);
		}
		else if(p1Pick == shoot && cpuPick == block) {
			p1Ammo -= 1;
		}
		else if(p1Pick == shoot && (cpuPick == reload || cpuPick == noAmmo)) {
			death(1);
		}
	}
	else if(p1Ammo == 0) {
		p1Log.innerHTML = "Player 1 tried to shoot without ammo!";
		if(p1Pick == shoot && cpuPick == shoot) {
			death(2);
		}
	}
}

function p1Reload(p1Pick, cpuPick) {
	if(p1Pick == reload && cpuPick == shoot) {
		death(2);
	}
	else if(p1Pick == reload && (cpuPick == block || cpuPick == reload)) {
		p1Log.innerHTML = "Player 1 reloaded!";
		p1Ammo += 1;
		console.log(p1Ammo);
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
	
	p1ScorePrint.innerHTML = "Player 1 Score : " + p1Score;
	p2ScorePrint.innerHTML = "Player 2 Score : " + p2Score;
	
	p1Ammo = 0;
	p2Ammo = 0;
}

function cpu() {
	const p2Log = document.getElementById("p2Log");
	
	if (p2Ammo == 0) {
		p2Pick = Math.floor(Math.random() * 2 + 1);
		if(p2Pick == reload) {
			p2Ammo += 1;
			p2Log.innerHTML = "Player 2 reloaded!";
			return p2Pick;
		}
		p2Log.innerHTML = "Player 2 blocked!";
		return p2Pick;
	}
	else if (p2Ammo > 0) {
		p2Pick = Math.floor(Math.random() * 3);
		if(p2Pick == shoot) {
			p2Ammo -= 1;
			p2Log.innerHTML = "Player 2 shoots!";
			return p2Pick;
		}
		else if(p2Pick == reload) {
			p2Ammo += 1;
			p2Log.innerHTML = "Player 2 reloaded!";
			return p2Pick;
		}
		p2Log.innerHTML = "Player 2 blocked!";
		return p2Pick;
	}
}

