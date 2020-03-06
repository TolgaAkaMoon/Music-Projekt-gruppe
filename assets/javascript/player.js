document.addEventListener("DOMContentLoaded", function () {

  var shuffleButton = document.querySelector(".functions__shuffle");
  var backButton = document.querySelector(".functions__back");
  var playButton = document.querySelector(".functions__play");
  var nextButton = document.querySelector(".functions__forward");
  var repeatButton = document.querySelector(".functions__repeat");
  var music = document.querySelector(".container__player");
  var mDuration = music.duration;
  document.querySelector(".container__end").textContent = Math.floor(mDuration / 60) + ":" + Math.floor(mDuration % 60);
  setInterval(function () {
    var currentTimeNew = Math.floor(music.currentTime % 60);
    var currentTimeMinute = Math.floor(music.currentTime / 60);

    if (currentTimeNew < 10) {
      document.querySelector(".container__start").textContent = currentTimeMinute + ":" + "0" + currentTimeNew;
    } else {
      document.querySelector(".container__start").textContent = currentTimeMinute + ":" + currentTimeNew;
    }
  }, 500);
  playButton.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      playButton.setAttribute("src", "assets/images/pause.svg");
    } else {
      music.pause();
      playButton.setAttribute("src", "assets/images/play.svg");
    }
  });
  var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes

  var playhead = document.querySelector(".slider__playhead"); // playhead

  var timeline = document.querySelector(".container__slider"); // timeline

  var progressBar = document.querySelector(".slider__progress");
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  music.addEventListener("timeupdate", timeUpdate, false);
  timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  }, false);

  function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  playhead.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);
  var onplayhead = false;

  function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
  }

  function mouseUp(event) {
    if (onplayhead == true) {
      moveplayhead(event);
      window.removeEventListener('mousemove', moveplayhead, true);
      music.currentTime = duration * clickPercent(event);
      music.addEventListener('timeupdate', timeUpdate, false);
    }

    onplayhead = false;
  }

  function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";

    if (music.currentTime == duration) {}
  }

  function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      playhead.style.marginLeft = newMargLeft + "px";
    }

    if (newMargLeft < 0) {
      playhead.style.marginLeft = "0px";
    }

    if (newMargLeft > timelineWidth) {
      playhead.style.marginLeft = timelineWidth + "px";
    }
  }

  function getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  setInterval(function () {
    progressBar.style.width = parseInt(playhead.style.marginLeft.replace(/px/, "")) + 5 + "px";
  }, 10);


  var file = document.getElementById("thefile");
  var audio = document.querySelector(".container__player");
  
  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#0010";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };


    let ip = "192.168.8.100"
    let user = "BVpJlymp0Nk6MzqSLTCUg1VQKBZc6qrpLS3kYdFn"
    let color = 0 - 65535
    let light = 5

    setInterval(function () {
      fetch(`http://192.168.8.100/api/${user}/lights/${light}/state`, {
        method: 'put',
        body: JSON.stringify({"bri": parseInt(document.querySelector(".seekerBright").value)}),
      })
      .then(res => res.json())
      .then(state => { 
        });
    }, 100);


/*     fetch(`/api`, {
      method: "post",
      body: {"devicetype":"my_hue_app#iphone peter"}¨
      , "hue": 00000, "bri": parseInt(lightBri)
    }) */

    
  

    fetch(`http://${ip}/api/${user}/lights/${light}`, {
    })
    .then(res => res.json())
    .then(tracks => {
      console.log(tracks)
        document.querySelector(".test__1").textContent = tracks.name
        setInterval(function () {
          document.querySelector(".test__2").textContent = tracks.state.on
        }, 500);
        document.querySelector(".test__3").addEventListener("click", function() {
          if (tracks.state.on == false) {
            tracks.state.on = true
          }
          else {
            tracks.state.on = false
          }
          fetch(`http://192.168.8.100/api/${user}/lights/${light}/state`, {
            method: 'put',
            body: JSON.stringify({"on": tracks.state.on}),
          })
          .then(res => res.json())
          .then(state => {  

            });
        });
      })

      document.querySelector(".seekerBright");

  }, false);

