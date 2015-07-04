;
(function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var canvasX = canvas.offsetWidth;
  var canvasY = canvas.offsetHeight;
  var strokeSize = 0.015;
  var animationFrame;

  //Options
  var optionsForm = document.getElementsByClassName("js-form")[0];
  var stopButton = document.getElementsByClassName("js-stopAnimation")[0];

  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.rotate(-Math.PI / 2);
  context.translate(-canvasWidth / 2, -canvasHeight / 2);

  var xBaseValue;
  var yBaseValue;
  var iIncrement = 0.008;
  var algorithm = function(n, k) {
    var diameter = Math.min(canvasWidth, canvasHeight) / 2,
        radialOffset = Math.sin(yBaseValue / 500) * 200,
        diameterChange = Math.pow((Math.cos(yBaseValue / 4) + 2) / 3, 2);

    var red = (yBaseValue * 10 % 255) | 0,
      green = (yBaseValue * 20 % 255) | 0,
      blue = (yBaseValue % 255) | 0;

    context.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", 0.9)";
    context.lineWidth = strokeSize;
    context.beginPath();
    for (var i = 0; i < n; i++) {
      var rpos = i + radialOffset;
      context.moveTo(canvasX / 2 + diameter * diameterChange * Math.cos(2 * rpos * (1 / n) * Math.PI), canvasY / 2 + diameter * diameterChange * Math.sin(2 * rpos * (1 / n) * Math.PI));
      context.lineTo(canvasX / 2 + diameter * diameterChange * Math.cos(2 * rpos * k * (1 / n) * Math.PI), canvasY / 2 + diameter * diameterChange * Math.sin(2 * rpos * k * (1 / n) * Math.PI));
      context.lineTo(canvasX / 2 + diameter * diameterChange * Math.cos(2 * (rpos + 0.01) * k * (1 / n) * Math.PI), canvasY / 2 + diameter * diameterChange * Math.sin(2 * (rpos + 0.01) * k * (1 / n) * Math.PI));
    }
    context.stroke();
  };

  var run = function() {
    algorithm(xBaseValue, yBaseValue); //100, 98
    yBaseValue += iIncrement;
  };

  var activeOptions = function(e) {
    e.preventDefault();
    getOptions();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    Animator.remove(animationFrame);
    animationFrame = Animator.add(run);
  };

  var getOptions = function() {
    xBaseValue = parseInt(document.getElementsByClassName("js-numberOfPoints")[0].value);
    yBaseValue = parseInt(document.getElementsByClassName("js-multiplicationNumber")[0].value);
  };

  var stopAnimation = function(e) {
    e.preventDefault();
    if (Animator.isRunning()) {
      this.innerHTML = 'Restart';
      Animator.stop();
    } else {
      this.innerHTML = 'Stop';
      Animator.start();
    }
  }

  optionsForm.addEventListener('submit', activeOptions);
  stopButton.addEventListener('click', stopAnimation);


  getOptions();
  animationFrame = Animator.add(run);

})();
