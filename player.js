window.addEventListener("DOMContentLoaded", () => {

  const audio = new Audio(),
        aPlay = document.getElementById("aPlay"),
        aPlayIco = document.getElementsByClassName("aPlayIco"),
        aNow = document.getElementById("aNow"),
        aTime = document.getElementById("aTime"),
        aSeek = document.getElementById("aSeek"),
        aVolume = document.getElementById("aVolume"),
        aVolIco = document.getElementById("aVolIco"),
        button = document.getElementById("aTest");
    let audioElements = document.getElementsByClassName("audio-entry");
    
    var idxPlaying = 0; //which track is playing
    
    var n = audioElements.length;
    var playlist = [];
    for (var i = 0; i < n; i++){
        playlist.push({});
    }
    
  // (A3) BUILD PLAYLIST
  for (let i = 0; i < audioElements.length; i++) {
      //console.log(audioElements[i].getAttribute("filename"));
//    let row = document.createElement("div");
//    row.className = "aRow";
//    row.innerHTML = playlist[i]["name"];
    playlist[i]["src"] = audioElements[i].getAttribute("filename");
       //console.log(playlist[i]);
    audioElements[i].addEventListener("click", () => { 
        if (audio.paused){
            idxPlaying = i;
            audPlay(i); 
        }
        else {
            audio.pause();
        }
    });
    playlist[i]["row"] = audioElements[i];
   
  }
    
  
  // (B) PLAY MECHANISM
  // (B1) FLAGS
  var audNow = 0, // current song
      audStart = false, // auto start next song

  // (B2) PLAY SELECTED SONG
  audPlay = (idx, nostart) => {
    audNow = idx;
    audStart = nostart ? false : true;
      //console.log(playlist[idx]);
    audio.src = playlist[idx]["src"];
    for (let i in playlist) {
      if (i == idx) { playlist[i]["row"].classList.add("now"); }
      else { playlist[i]["row"].classList.remove("now"); }
    }
  };

  // (B3) AUTO START WHEN SUFFICIENTLY BUFFERED
  audio.addEventListener("canplay", () => { if (audStart) {
    audio.play();
    audStart = false;
  }});

  // (B4) AUTOPLAY NEXT SONG IN THE PLAYLIST
  audio.addEventListener("ended", () => {
    audNow++;
    if (audNow >= playlist.length) { audNow = 0; }
    audPlay(audNow);
  });

  // (B5) INIT SET FIRST SONG
  audPlay(0, true);

  // (C) PLAY/PAUSE BUTTON
  // (C1) AUTO SET PLAY/PAUSE TEXT
  audio.addEventListener("play", () => {
      for(let i = 0; i < aPlayIco.length; i++){
          if (i == idxPlaying || i == aPlayIco.length-1){ 
            aPlayIco[i].innerHTML = "pause";
          }
      }  
  });
  audio.addEventListener("pause", () => {
      for(let i = 0; i < aPlayIco.length; i++){
          aPlayIco[i].innerHTML = "play_arrow";
      }  
  });

  // (C2) CLICK TO PLAY/PAUSE
  aPlay.addEventListener("click", () => {
    if (audio.paused) { audio.play(); }
    else { audio.pause(); }
  });

  // (D) TRACK PROGRESS
  // (D1) SUPPORT FUNCTION - FORMAT HH:MM:SS
  var timeString = (secs) => {
    // HOURS, MINUTES, SECONDS
    let ss = Math.floor(secs),
        hh = Math.floor(ss / 3600),
        mm = Math.floor((ss - (hh * 3600)) / 60);
    ss = ss - (hh * 3600) - (mm * 60);

    // RETURN FORMATTED TIME
    if (hh>0) { mm = mm<10 ? "0"+mm : mm; }
    ss = ss<10 ? "0"+ss : ss;
    return hh>0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}` ;
  };

  // (D2) INIT SET TRACK TIME
  audio.addEventListener("loadedmetadata", () => {
    aNow.innerHTML = timeString(0);
    aTime.innerHTML = timeString(audio.duration);
  });

  // (D3) UPDATE TIME ON PLAYING
  audio.addEventListener("timeupdate", () => {
    aNow.innerHTML = timeString(audio.currentTime);
  });

  // (E) SEEK BAR
  audio.addEventListener("loadedmetadata", () => {
    // (E1) SET SEEK BAR MAX TIME
    aSeek.max = Math.floor(audio.duration);

    // (E2) USER CHANGE SEEK BAR TIME
    var aSeeking = false; // USER IS NOW CHANGING TIME
    aSeek.addEventListener("input", () => {
      aSeeking = true; // PREVENTS CLASH WITH (E3)
    });
    aSeek.addEventListener("change", () => {
      audio.currentTime = aSeek.value;
      if (!audio.paused) { audio.play(); }
      aSeeking = false;
    });

    // (E3) UPDATE SEEK BAR ON PLAYING
    audio.addEventListener("timeupdate", () => {
      if (!aSeeking) { aSeek.value = Math.floor(audio.currentTime); }
    });
  });

  // (F) VOLUME
  aVolume.addEventListener("change", () => {
    audio.volume = aVolume.value;
    aVolIco.innerHTML = (aVolume.value==0 ? "volume_mute" : "volume_up");
  });

  // (G) ENABLE/DISABLE CONTROLS
  audio.addEventListener("canplay", () => {
    aPlay.disabled = false;
    aVolume.disabled = false;
    aSeek.disabled = false;
  });
  audio.addEventListener("waiting", () => {
    aPlay.disabled = true;
    aVolume.disabled = true;
    aSeek.disabled = true;
  });
});
