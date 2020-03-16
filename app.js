'use strict' ;


var allImages = [];
var voteRounds = 0;

function VoteImage(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.numClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}

new VoteImage('bag', '/img/bag.jpg');
new VoteImage('banana', '/img/banana.jpg');
new VoteImage('bathroom', '/img/bathroom.jpg');
// new voteImage('boots','/img/boots.jpg');
// new voteImage('breakfast','/img/breakfast.jpg');
// new voteImage('bubblegum','/img/bubblegum.jpg');
// new voteImage('chair','/img/chair.jpg');
// new voteImage('cthulu','/img/cthulu.jpg');
// new voteImage('dog-duck','/img/dog-duck.jpg');
// new voteImage('dragon','/img/dragon.jpg');
// new voteImage('pen','/img/pen.jpg');
// new voteImage('pet-sweep','/img/pet-sweep.jpg');
// new voteImage('scissors','/img/scissors.jpg');
// new voteImage('sweep','/img/sweep.jpg');
// new voteImage('tauntaun','/img/tauntaun.jpg');
// new voteImage('unicorn','/img/unicorn.jpg');
// new voteImage('usb','/img/usb.gif');
// new voteImage('water-can','/img/water-can.jpg');
// new voteImage('wine-glass','/img/wine-glass.jpg');

console.log(allImages);
var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');

// Generate a random Image

function generateRandomImage(){
  var index = Math.floor(Math.random()* allImages.length);

  while (
    allImages[index].name === image1.name ||
        allImages[index].name === image2.name ||
        allImages[index].name === image3.name
  ) {
    index = Math.floor(Math.random() * allImages.length)
  }
  return allImages[index];
}

function renderImages() {

  // decide rendered images
  console.log(image1.src);
  console.log(image2.src);
  console.log(image3.src);

  // Generate New Image based on random

  var newImage1 = generateRandomImage();
  image1.src = newImage1.imagepath;
  image1.name = newImage1.name;
  newImage1.timesRendered++;

  var newImage2 = generateRandomImage();
  image2.src = newImage2.imagepath;
  image2.name = newImage2.name;
  newImage2.timesRendered++;

  var newImage3 = generateRandomImage();
  image3.src = newImage3.imagepath;
  image3.name = newImage3.name;
  newImage3.timesRendered++;
}
renderImages();

function clickHandler(event) {
  console.log(event.target.name);

  for (var i = 0; i < allImages.length; i++) {
    if (allImages[i].name === event.target.name) {
      allImages[i].numClicked++;
    }
  }
  renderImages();
}

image1.addEventListener('click', clickHandler);
image2.addEventListener('click', clickHandler);
image3.addEventListener('click', clickHandler);
