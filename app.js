'use strict' ;


var allImages = [];
var voteRounds = 0;

var ctx = document.getElementById('bar-chart').getContext('2d');
var mainChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Your Favorite Pics!',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 0
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


function VoteImage(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.numClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}

new VoteImage('Bag', 'img/bag.jpg');
new VoteImage('Banana', 'img/banana.jpg');
new VoteImage('Bathroom', 'img/bathroom.jpg');
new VoteImage('Boots', 'img/boots.jpg');
new VoteImage('Breakfast', 'img/breakfast.jpg');
new VoteImage('Bubblegum', 'img/bubblegum.jpg');
new VoteImage('Chair', 'img/chair.jpg');
new VoteImage('Cthulu', 'img/cthulhu.jpg');
new VoteImage('Dog-duck', 'img/dog-duck.jpg');
new VoteImage('Dragon', 'img/dragon.jpg');
new VoteImage('Pen', 'img/pen.jpg');
new VoteImage('Pet-sweep', 'img/pet-sweep.jpg');
new VoteImage('Scissors', 'img/scissors.jpg');
new VoteImage('Sweep', 'img/sweep.png');
new VoteImage('Tauntaun', 'img/tauntaun.jpg');
new VoteImage('Unicorn', 'img/unicorn.jpg');
new VoteImage('Usb', 'img/usb.gif');
new VoteImage('Water-can', 'img/water-can.jpg');
new VoteImage('Wine-glass', 'img/wine-glass.jpg');

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
    index = Math.floor(Math.random() * allImages.length);
  }
  return allImages[index];
}

function renderImages() {

  // decide rendered images
  //   console.log(image1.src);
  //   console.log(image2.src);
  //   console.log(image3.src);

  // Generate New Image based on random

  var newImage1 = generateRandomImage();
  image1.src = newImage1.imagePath;
  image1.name = newImage1.name;
  newImage1.timesRendered++;
  // voteRounds = voteRounds++;

  var newImage2 = generateRandomImage();
  image2.src = newImage2.imagePath;
  image2.name = newImage2.name;
  newImage2.timesRendered++;
  // voteRounds = voteRounds++;


  var newImage3 = generateRandomImage();
  image3.src = newImage3.imagePath;
  image3.name = newImage3.name;
  newImage3.timesRendered++;
  // voteRounds = voteRounds++;


}
renderImages();


function renderResults() {
  var listEl = document.getElementById('ranking');

  for (var i = 0; i < allImages.length; i++) {
    var rank = document.createElement('li');
    var message = (allImages[i].name + ' had ' + allImages[i].numClicked + ' votes and was shown ' + allImages[i].timesRendered + ' times ');
    rank.textContent = message;
    listEl.appendChild(rank);
    // console.log(timesClicked);
  }
}

function renderGraph() {
  for (var i = 0; i < allImages.length; i++) {
    mainChart.data.labels.push(allImages[i].name);
    mainChart.data.datasets[0].data.push(allImages[i].numClicked);
    // console.log(allImages);
    localStorage.setItem('allImages', JSON.stringify(allImages) );

  }
}

function renderLocalData(){
  for (var i = 0; i < allImages.length; i++) {
    allImages = JSON.parse(localStorage.allImages);
    mainChart.data.labels.push(allImages[i].name);
    mainChart.data.datasets[0].data.push(allImages[i].numClicked);
    // console.log(allImages);

  }


}

function clickHandler(event) {
//   console.log(event.target.name);

  if (!localStorage.allImages) {
    var listEl = document.getElementById('ranking');
    listEl.innerHTML = '';
    voteRounds++;


    for (var i = 0; i < allImages.length; i++) {
      if (allImages[i].name === event.target.name) {
        allImages[i].numClicked++;
        // console.log(voteRounds);
        renderImages();

      } if (voteRounds >= 25) {
        event = false;
        image1.removeEventListener('click', clickHandler);
        image2.removeEventListener('click', clickHandler);
        image3.removeEventListener('click', clickHandler);
        alert('Thanks for Voting! Check out your Results!');
        renderResults();
        renderGraph();
        mainChart.update();
      // break;
      }

    }

    // console.log(allImages[i].numClicked);
  } else {
    event = false;
    image1.removeEventListener('click', clickHandler);
    image2.removeEventListener('click', clickHandler);
    image3.removeEventListener('click', clickHandler);
    alert('Thanks for Voting! Check out your Results!');
    renderResults();
    renderLocalData();
    mainChart.update();
  }

}


image1.addEventListener('click', clickHandler);
image2.addEventListener('click', clickHandler);
image3.addEventListener('click', clickHandler);

// renderResults();
