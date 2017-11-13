var emoji;
var emojiSize = 40;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / emojiSize; i++) {
    var stream = new Stream();
    stream.generateEmojis(x, round(random(0, height)));
    streams.push(stream);
    x += emojiSize;
  }
  textSize(emojiSize);
}

function draw() {
  background(0);
  streams.forEach(function(stream) {
    stream.render();
  });
}

/**
 * Instantiates one Emoji character
 * @param {*} x 
 * @param {*} y 
 * @param {*} speed 
 */
function Emoji(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.value;
  this.switchInterval = round(random(5, 20));
  
  // Switches emoji's at every nth frame
  this.getRandomEmoji = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCodePoint(
        '0x1F' + floor(random(1536, 1616)).toString(16)
      );
    }
  } 
  
  // draws an emoji falling down from the screen 
  // this is redrawn at the top each time an emoji hit's the 
  // bottom of the screen
  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }  
}

/**
 * Instantiates an array of vertically stacked Emojis 
 */
function Stream() {
  this.emojis = [];
  this.totalEmojis = round(random(2, 15));
  this.speed = random(4, 10);
  
  this.generateEmojis = function(x, y) {
    for (var i = 0; i <= this.totalEmojis; i++) {
      emoji = new Emoji(x, y, this.speed);
      emoji.getRandomEmoji();
      this.emojis.push(emoji);
      y -= emojiSize;
    }
  }
  
  // draws a raining emoji and randomly 
  // switches emoji's at every nth frame
  this.render = function() {
    this.emojis.forEach(function(emoji, i, all) {
      fill(0);
      text(emoji.value, emoji.x, emoji.y);
      fill(0, 0, 0, (i * floor(255 / all.length-1)));
      rect(emoji.x, emoji.y - emojiSize, emojiSize, emojiSize);
      emoji.rain();
      emoji.getRandomEmoji();
    });
  }  
}
  
