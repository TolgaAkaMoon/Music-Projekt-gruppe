document.addEventListener("DOMContentLoaded", function () {

  let lightBox = document.querySelector(".light__value__get")

  // Hue Information
  let ip = "192.168.8.100"
  let user = "BVpJlymp0Nk6MzqSLTCUg1VQKBZc6qrpLS3kYdFn"
  let color = 0 - 65535
  let light = 5


  // Music Player
  let shuffleButton = document.querySelector(".functions__shuffle");
  let backButton = document.querySelector(".functions__back");
  var playButton = document.querySelector(".functions__play");
  let nextButton = document.querySelector(".functions__forward");
  let repeatButton = document.querySelector(".functions__repeat");
  let music = document.querySelector(".container__player");
  let mDuration = music.duration;

  document.querySelector(".container__end").textContent = Math.floor(mDuration / 60) + ":" + 
  Math.floor(mDuration % 60); setInterval(function () {
  let currentTimeNew = Math.floor(music.currentTime % 60);
  let currentTimeMinute = Math.floor(music.currentTime / 60);
  if (currentTimeNew < 10) { document.querySelector(".container__start").textContent = currentTimeMinute + ":" + "0" + currentTimeNew;
  } else { document.querySelector(".container__start").textContent = currentTimeMinute + ":" + currentTimeNew; }}, 500);
  playButton.addEventListener("click", function () { if (music.paused) { music.play();
  playButton.setAttribute("src", "assets/images/pause.svg"); } else { music.pause();
  playButton.setAttribute("src", "assets/images/play.svg");}});
  let duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
  let playhead = document.querySelector(".slider__playhead"); // playhead
  let timeline = document.querySelector(".container__slider"); // timeline
  let progressBar = document.querySelector(".slider__progress");
  let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  music.addEventListener("timeupdate", timeUpdate, false);
  timeline.addEventListener("click", function (event) { moveplayhead(event);
  music.currentTime = duration * clickPercent(event); }, false); function clickPercent(event) {
  return (event.clientX - getPosition(timeline)) / timelineWidth; }
  playhead.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false); let onplayhead = false;
  function mouseDown() { onplayhead = true;
  window.addEventListener('mousemove', moveplayhead, true);
  music.removeEventListener('timeupdate', timeUpdate, false);
  } function mouseUp(event) { if (onplayhead == true) { moveplayhead(event);
  window.removeEventListener('mousemove', moveplayhead, true);
  music.currentTime = duration * clickPercent(event);
  music.addEventListener('timeupdate', timeUpdate, false);} onplayhead = false; }
  function timeUpdate() { let playPercent = timelineWidth * (music.currentTime / duration);
  playhead.style.marginLeft = playPercent + "px"; if (music.currentTime == duration) {}
  } function moveplayhead(event) {
  let newMargLeft = event.clientX - getPosition(timeline);
  if (newMargLeft >= 0 && newMargLeft <= timelineWidth) { playhead.style.marginLeft = newMargLeft + "px";}
  if (newMargLeft < 0) { playhead.style.marginLeft = "0px";}
  if (newMargLeft > timelineWidth) { playhead.style.marginLeft = timelineWidth + "px";}}
  function getPosition(el) { return el.getBoundingClientRect().left; }
  setInterval(function () { progressBar.style.width = parseInt(playhead.style.marginLeft.replace(/px/, "")) + 5 + "px";}, 10);

  
    
  // Hue Visualizer
  let file = document.getElementById("thefile");
  let audio = document.querySelector(".container__player");
  
  file.onchange = function() {
    
    let files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    let analyser = context.createAnalyser();
    
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    
    src.connect(analyser);
    analyser.connect(context.destination);
    
    analyser.fftSize = 256;
    
    let bufferLength = analyser.frequencyBinCount;
    
    let dataArray = new Uint8Array(bufferLength);
    
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    






  fetch(`http://${ip}/api/${user}/lights/${light}/state`, {

  })
  .then((response) => response.json())
  .then((data) => {

    setInterval(function(){ 
      requestAnimationFrame(setInterval);
      x = 0;
      analyser.getByteFrequencyData(dataArray);

        fetch(`http://${ip}/api/${user}/lights/${light}/state`, {
          method: 'put',
          body: JSON.stringify({"bri": parseInt(dataArray[50])}),
        })
        .then(res => res.json())
        .then(state => {
        });
    }, 300);

    setInterval(function () {
      fetch(`http://${ip}/api/${user}/lights/${light}`, {
      })
      .then(res => res.json())
      .then(tracks => {
      fetch(`http://${ip}/api/${user}/lights/${light}/state`, {
        method: 'put',
        body: JSON.stringify({"bri": parseInt(document.querySelector(".seekerBright").value)}),
      })
      .then(res => res.json())
      .then(state => {
        })
      }, 300); 
    });

  }).catch((error) => {
    console.log(error)
  });


/*      fetch(`/api`, {
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
          document.querySelector(".seekerBright__valueText").textContent = tracks.state.bri;
        }, 500);
        document.querySelector(".test__3").addEventListener("click", function() {
          if (tracks.state.on == false) {
            tracks.state.on = true
          }
          else {
            tracks.state.on = false
          }
          fetch(`http://${ip}/api/${user}/lights/${light}/state`, {
            method: 'put',
            body: JSON.stringify({"on": tracks.state.on, "hue": 40000})
          })
          .then(res => res.json())
          .then(state => {  

            });
        });
      });
    }
    
  });