// Declares global variables
var canvas = document.createElement("canvas");
	c = canvas.getContext("2d"),
	backgroundImg = new Image(), // loads spritesheet for background things
	backgroundImgReady = false, 
	make = {},
	maps = {},
	wallColor = "#2a2a2a", // Grey color
	width = 512,
	height = 512;

// Creates the requestAnimationFrame variable
(function () {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
}) ();

// Modifies the canvas' properties

backgroundImg.onload = function () {
	backgroundImgReady = true;
},
backgroundImg.src = "src/img/background.png",
canvas.width = width,
canvas.height = height,
c.webkitImageSmoothingEnabled = false,
c.mozImageSmoothingEnabled = false,
c.imageSmoothingEnabled = false;

// 2D arrays that make up maps
maps = {
	one: [
	["w","w","w","w","w","w","w","w"],
	["w","d","d","d","d","d","d","w"],
	["w","f","w","w","w","w","f","w"],
	["w","f","w","d","s","d","f","w"],
	["w","f","w","f","w","f","f","w"],
	["w","f","w","f","d","w","f","w"],
	["w","f","d","f","f","d","f","w"],
	["w","w","w","w","w","w","w","w"]
	],

	two: [
	["w","w","w","w","w","w","w","w"],
	["w","d","d","d","d","d","d","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","b","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","b","w"],
	["w","w","w","w","w","w","w","w"]
	],

	three: [
	["w","f","w","w","w","w","f","w"],
	["w","f","d","d","d","d","f","w"],
	["w","f","f","f","f","f","b","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","b","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","w","f","f","w","f","w"],
	["w","w","w","w","w","w","w","w"]
	],

	random: [
	["w","w","w","w","w","w","w","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","f","f","f","f","f","f","w"],
	["w","w","w","w","w","w","w","w"]
	]
};

// Maps drawing functions
make = {
	map: function ( map2d ) {
		var i,
			j,
			tile,
			tilesX = 8,
			tilesY = 8;

		for (i = 0; i < tilesX; i++) {
			for(j = 0; j < tilesY; j++) {
				this.tile(i * 64, j * 64, map2d[i][j]);
			}
		}
	},

	randomMap: function () {
		var i,
			j,
			tile,
			tilesX = 8,
			tilesY = 8;

		for (i = 0; i < tilesX; i++) {
			for(j = 0; j < tilesY; j++) {
				var randNum = Math.floor(Math.random() * 10);
				 if (randNum >= 3) {
					if (maps.random[i][j - 1] === "w"){
						if(randNum > 7) {
							maps.random[i][j] = "s";
						} else {
							maps.random[i][j] = "d";
						}
					} else if (randNum > 8) {
						maps.random[i][j] = "b";
					} else {
						maps.random[i][j] = "f";
					}
				} else if (randNum < 3) {
					maps.random[i][j] = "w";
				}
			}
		}
	},

	tile: function (x, y, TD) {
		switch (TD) {
			case "w":
				if (backgroundImgReady) {
					c.drawImage(backgroundImg, 0, 0, 32, 32, x, y, 64, 64);
				}

				break;

			case "f":
				if (backgroundImgReady) {
					c.drawImage(backgroundImg, 0, 32, 32, 32, x, y, 64, 64);
				}

				break;
			
			case "b":
				if (backgroundImgReady) {
					c.drawImage(backgroundImg, 32, 32, 32, 32, x, y, 64, 64);
				}

				break;

			case "d":
				if (backgroundImgReady) {
					c.drawImage(backgroundImg, 0, 64, 32, 32, x, y, 64, 64);
				}

				break;

			case "s":
				if (backgroundImgReady) {
					c.drawImage(backgroundImg, 32, 64, 32, 32, x, y, 64, 64);
				}

				break;
		}
	}
}

// Updates constantly
function update () {
	c.clearRect(0, 0, width, height);
	make.map(maps.random);
	requestAnimationFrame(update);
}

// Begins updating when window is ready
window.addEventListener("load", function () {
	make.randomMap();
	document.body.appendChild(canvas);
	update();
});