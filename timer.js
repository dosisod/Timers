let isHeld=false
let lastHeld=false
let isSticky=false

let isActive=false
let timerStart=Date.now()
let currentTime=0
let times=[]

const SIDES=["U", "D", "L", "R", "F", "B"]
const TURNS=["'", "", "2"]

const SHOW_MAX=10
const MAX_SCRAMBLE=20

function getId(id) {
	return document.getElementById(id)
}

window.addEventListener("load", function() {
	scramble()
	setInterval(clock, 1000/60)
})

document.onkeydown=function(e) {
	if (e.key==" " && !isHeld) {
		isHeld=true
	}
}

document.onkeyup=function(e) {
	if (e.key==" ") {
		if (!isSticky) {
			isHeld=false
		}
		else {
			isSticky=false
		}
	}
}

function clock() {
	if (lastHeld && !isHeld && !isActive) {
		isActive=true
		isSticky=true
		start()
	}
	else if (!lastHeld && isHeld && isActive) {
		isActive=false
		reset()
	}

	if (isActive) {
		redraw()
	}

	lastHeld=isHeld
}

function start() {
	timerStart=Date.now()

	getId("time").style.fontSize="100px"
	getId("scramble").style.display="none"
	getId("times").style.display="none"
}

function reset() {
	times.push([
		currentTime,
		getId("scramble").innerText
	])

	if (times.length==SHOW_MAX) {
		times.shift()
	}

	getId("times").innerHTML="---<br><br>"

	for (let i=0; i<times.length; i++) {
		let span=document.createElement("span")

		span.onclick=function() {
			alert(times[i][1])
		}

		span.innerText=times[i][0]

		getId("times").appendChild(span)
		getId("times").appendChild(document.createElement("br"))
	}

	getId("time").style.fontSize="15px"
	getId("scramble").style.display="inline"
	getId("times").style.display="inline"

	scramble()
}

function redraw() {
	currentTime=getId("time").innerHTML=parseFloat(
		(Date.now() - timerStart) / 1000
	).toFixed(3)
}

function scramble() {
	let lastSide=""
	let currentSide=""
	let scramble=""

	for (let i=0; i<MAX_SCRAMBLE; i++) {
		do {
			currentSide=randomElement(SIDES)
		} while (currentSide==lastSide)

		lastSide=currentSide
		scramble+=currentSide+randomElement(TURNS) + " "
	}
	getId("scramble").innerText=scramble
}

function randomElement(arr) {
	return arr[Math.floor( Math.random() * arr.length )]
}
