// Declare variables and flags

let sessMin = 25
let sessSec = 0

let breakMin = 5
let breakSec = 0

let currMin = sessMin
let currSec = sessSec

let running = false
let intID
let session = true

$(document).ready(function() {
	
	$("#bdown").click(function(e) {
		e.preventDefault()
		if (!running) {
			let curr = parseInt($("#b").text())
			if (curr > 0) {
				curr--
			}
			breakMin = curr
			$("#b").text(curr)
		}
	})
	
	$("#bup").click(function(e) {
		e.preventDefault()
		if (!running) {
			let curr = parseInt($("#b").text())
			curr++
			breakMin = curr
			$("#b").text(curr)	
		}	
	})
	
	$("#sdown").click(function(e) {
		e.preventDefault()
		if (!running) {
			let curr = parseInt($("#s").text())
			if (curr > 0) {
				curr--
			}
			$("#s").text(curr)
			$("#min").text(curr)
			sessMin = curr
			reset()
		}
	})
	
	$("#sup").click(function(e) {
		e.preventDefault()
		if (!running) {
			let curr = parseInt($("#s").text())
			curr++
			$("#s").text(curr)
			$("#min").text(curr)
			sessMin = curr
			reset()
		}

	})
	
	$("#start").click(function(e) {
		e.preventDefault()
		changeIcon()
		console.log(running)
	})
	
	$("#reset").click(function(e) {
		e.preventDefault()
		if (!running) {
			reset()
		}
	})
	
})

function startTimer() {
	changeState()
	$(".disablable").addClass("disabled")
	let min = currMin
	let sec = currSec
	intID = setInterval(function() {
		changeState()
		if (sec > 0) {
			sec--
			if (sec < 10) {
				$("#sec").text("0"+sec)
			} else {
				$("#sec").text(sec)
			}
		} else {
			min--
			sec = 59
			$("#sec").text(sec)
			$("#min").text(min)
		}

		if (min === 0 && sec === 0) {
			if (session) {
				console.log("Set session false")
				session = false
				min = breakMin
				sec = breakSec
			} else {
				console.log("Set session true")
				session = true
				min = sessMin
				sec = sessSec
			}

		}
		
	}, 1000)
}

function stopTimer() {
	clearInterval(intID)
	currMin = parseInt($("#min").text())
	currSec = parseInt($("#sec").text())
	$("#state").text("　")
	$(".disablable").removeClass("disabled")
}

function reset() {
	currSec = 0
	currMin = sessMin
	session = true
	$("#sec").text("00")
	$("#min").text(currMin)
}

function changeIcon() {
	if (running){
		$("#start .fa").removeClass("fa-pause")
		$("#start .fa").addClass("fa-play")
		running = false
		stopTimer()
	} 
	else {
		$("#start .fa").removeClass("fa-play")
		$("#start .fa").addClass("fa-pause")
		running = true
		startTimer()
	}
}

function changeState() {
	if (session) {
		$("#state").text("Get Working!")
	} else {
		$("#state").text("Break Time")
	}
}