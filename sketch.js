// var symbol;
var symbolSize = 26;
var streams = [];


function setup(){
	createCanvas(
		window.innerWidth,
		window.innerHeight);
	background(0);
	// stream = new Stream();
	// stream.generateSymbols();
	var x = 0;
	// var y = 0;
//Total window width divided by the symbolSize will give us the total numbers of the symbols

	for (var i = 0; i<= width / symbolSize; i++){
		stream = new Stream();
		stream.generateSymbols(x,random(-2000,0));
		streams.push(stream);
		x += symbolSize

	}

	textSize(symbolSize);
	// symbol = new Symbol(
	// 	width/2, 0 , random(5,10)
	// );
	// symbol.setToRandomSymbol();
	// textSize(symbolSize);
}

function draw(){
	background(0,150);
	// stream.render();
	streams.forEach(function(stream){
		stream.render();

	});
}

function Symbol(x,y,speed, first){
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2,40)); // set the symbol switching speed
	this.first = first;
	// Make the Hiragana random symbol
	this.setToRandomSymbol = function(){
		if (frameCount % this.switchInterval == 0){
// frameCount is a buildin variable in p5.js that counts how many frames have passed thus far.
//By using modulor, we can make the symbol changes only when switchinterval is even.
			this.value = String.fromCharCode(
			0x30A0 + round(random(0,96))
			);
		}
		else{
			this.value = round(random(0,9));
		}
		
	}
	
	
	this.rain = function(){
		if (this.y >= height){
			this.y = 0;
		}
		else{
			this.y+=this.speed;
		}
// Alternative way of codiong；
//this.y = (this.y >= height) ? 0 : this.y += this.speed;		

	}


}

function Stream(){
	this.symbols = []; //set symbols as a array of string
	this.totalSymbols = round(random(5,35)); // each string should know how many symbols it has
	this.speed = random(5,22); // each string should know how fast it's travelling

	this.generateSymbols = function(x,y){
		// var y = 0; // set y = 0 so the symbols start at the top of the page
		// var x = width/2;
// For loop to create the symbols 
		var first = round(random(0,4)) == 1;
		for (var i=0; i <= this.totalSymbols; i++){
			symbol = new Symbol(x,y,this.speed); //locate new symbols
			symbol.setToRandomSymbol(); //make new symbols
			this.symbols.push(symbol); // push the new symbols to the array
			y -= symbolSize; //decromate y by the symbol size to set the next symbol right next to the current one
			first = false;
		}
	}

	this.render = function(){

		this.symbols.forEach(function(symbol){
			if (symbol.first){
				fill(140,220,170);

			}
			else{
				fill(0,220,70);// Define the color of the text
			}
			
			text(symbol.value,symbol.x,symbol.y);
			symbol.rain(); //call the rain function to make the symbols move down and disappear when it reaches bottom
			symbol.setToRandomSymbol(); // call the random symbol function to make the symbols change when moving
		});

	}

}