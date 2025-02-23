// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "PLAYLIST_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Circuitry",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/87ea945c-cd3f-473b-a255-e280f010795b.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/87ea945c-cd3f-473b-a255-e280f010795b.jpg"
    },
    {
      name: "Ancient Heartwood",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/726d5704-aa3d-446b-bf76-7dd2b268e81f.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/726d5704-aa3d-446b-bf76-7dd2b268e81f.jpg"
    },
    {
      name: "Last Dance in Cluj",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/21e72cf9-360c-4d17-8198-dde2a3e37c62.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/21e72cf9-360c-4d17-8198-dde2a3e37c62.jpg"
    },
    {
      name: "When You Sing",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/9eb53631-9b47-4a6c-9567-f75a7f98e3e6.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/9eb53631-9b47-4a6c-9567-f75a7f98e3e6.jpg"
    },
    {
      name: "When Your Song Meets Mine",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/cc2fcd79-7c0b-4f55-b2cf-7c57233ac0a9.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/cc2fcd79-7c0b-4f55-b2cf-7c57233ac0a9.jpg"
    },
    {
      name: "When Your Song Meets Mine",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/b4b17dc8-30d5-45e8-b060-b65580ae1268.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/b4b17dc8-30d5-45e8-b060-b65580ae1268.jpg"
    },
    {
      name: "Mare e Cielo (Sea and Sky)",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/58f3eef5-bc8d-4bd0-a8a5-d8a9d7252ef5.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/58f3eef5-bc8d-4bd0-a8a5-d8a9d7252ef5.jpg"
    },
    {
      name: "Circuitry",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/5562b3f7-02fb-4a4f-b653-81044261a9d1.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/5562b3f7-02fb-4a4f-b653-81044261a9d1.jpg"
    },
    {
      name: "Move With Me (Dolce Vita)",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/aaedc461-7015-4c0a-8749-304f2977b42f.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/aaedc461-7015-4c0a-8749-304f2977b42f.jpg"
    },
    {
      name: "Ciao, My Enemy",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/60f81fd7-ece1-4eb5-a646-8ddd8d6e0d49.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/60f81fd7-ece1-4eb5-a646-8ddd8d6e0d49.jpg"
    },
    {
      name: "Riffusion",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/79c73a5b-1914-44a7-aea6-c25abaa75ac2.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/79c73a5b-1914-44a7-aea6-c25abaa75ac2.jpg"
    },
    {
      name: "Onomatopoeia",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/5ac64928-9678-4a6e-9f49-c11398e00b53.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/5ac64928-9678-4a6e-9f49-c11398e00b53.jpg"
    },
    {
      name: "Spinning In My Room",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/62ad67ad-d98d-4f21-8107-96883a5640d9.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/62ad67ad-d98d-4f21-8107-96883a5640d9.jpg"
    },
    {
      name: "Dancing Without You",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/4366bbbe-840d-4469-b667-948cf679921e.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/4366bbbe-840d-4469-b667-948cf679921e.jpg"
    },
    {
      name: "Cultural Flow",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/e67d2bcd-288b-4621-96f6-eacc9582f7bf.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/e67d2bcd-288b-4621-96f6-eacc9582f7bf.jpg"
    },
    {
      name: "Messages to Tomorrow",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/5a473dd9-26d5-4a2a-b9c4-e9e72d908679.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/5a473dd9-26d5-4a2a-b9c4-e9e72d908679.jpg"
    },
    {
      name: "Curtains of Light",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/9500e59b-75dc-4847-b669-3392d6c9908d.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/9500e59b-75dc-4847-b669-3392d6c9908d.jpg"
    },
    {
      name: "Break of Dawn",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/da518d27-bc0f-4f13-891f-90309d72adab.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/da518d27-bc0f-4f13-891f-90309d72adab.jpg"
    },
    {
      name: "A Thousand Suns",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/a6b7a597-7200-453e-b26c-5903cc3f1ccd.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/a6b7a597-7200-453e-b26c-5903cc3f1ccd.jpg"
    },
    {
      name: "Right Where I Belong",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/c39ab5ee-b579-4647-b9d7-5a550470044f.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/c39ab5ee-b579-4647-b9d7-5a550470044f.jpg"
    },
    {
      name: "Running on Grace",
      singer: "DoDa",
      path: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/audio/5a11635a-ad40-4398-8607-929ff8713588.m4a",
      image: "https://api.riffusion.com/storage/v1/object/public/riffs/9fae13e9-0799-4fff-9a7f-102de0e10c02/image/5a11635a-ad40-4398-8607-929ff8713588.jpg"
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Assign configuration from config to application
    this.loadConfig();

    // Defines properties for the object
    this.defineProperties();

    // Listening / handling events (DOM events)
    this.handleEvents();

    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("", this.isRandom);
    repeatBtn.classList.toggle("", this.isRepeat);
  }
};

app.start();
