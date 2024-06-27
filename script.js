document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const albumCover = document.querySelector(".album-cover img");
    const trackNameDisplay = document.querySelector(".track-info h2");
    const artistDisplay = document.querySelector(".track-info h3");

    // Array de objetos com informações das músicas
    const playlist = [
        {
            name: "The Ice Titan",
            artist: "CastleVania Lords of Shadow OST",
            audioSrc: "./Castlevania Lords Of Shadow OST - The Ice Titan.mp3",
            coverSrc: "./castlevania lords of shadow cover.jpg",
            backgroundSrc: "./castlevania lords of shadow wallpaper.jpg"
        },
        {
            name: "One Winged Angel Rebirth Advent Children Version (Cover)",
            artist: "The Tiberian Sons",
            audioSrc: "./One Winged Angel Rebirth (Advent Children Version) - Epic Symphonic Metal Cover.mp3",
            coverSrc: "./One Winged Angel Cover.jpg",
            backgroundSrc: "./One Winged Angel background.jpg"
        },

        {
            name: "Pegasus Fantasy",
            artist: "Cavaleiros do Zodiaco OST",
            audioSrc: "Abertura Os Cavaleiros Do Zodíaco - PEGASUS FANTASY (BR) [1080p].mp3",
            coverSrc: "cavaleiros do zodiaco cover.jpg",
            backgroundSrc: "Cavaleiros do Zodiaco background.jpg"
        },

        {
            name: "Pegasus Fantasy Original",
            artist: "Cavaleiros do Zodiaco OST",
            audioSrc: "Pegasus Fantasy - Saint Seiya - original japanese opening - subtitled.mp3",
            coverSrc: "cavaleiros de ouro cover.jpg",
            backgroundSrc: "cavaleiros de ouro background.jpg"
        },

        {
            name: "Cavaleiros do Zodiaco encerramento",
            artist: "Cavaleiros do Zodiaco OST",
            audioSrc: "Cavaleiros do Zodiaco encerramento.mp3",
            coverSrc: "Cavaleiros do Zodiaco encerramento cover.jpeg",
            backgroundSrc: "Cavaleiros do Zodiaco encerramento background.jpg"
        },

        {
            name: "Away",
            artist: "Final Fantasy XVI OST",
            audioSrc: "_Away_ FFXVI OST 026 (Phoenix Vs. Ifrit Theme).mp3",
            coverSrc: "Final Fantasy XVI cover.jpg",
            backgroundSrc: "Final Fantasy XVI Wallpaper.jpg"
        },
        
        // Adicione mais músicas conforme necessário
    ];

    let currentTrackIndex = 0; // Índice da música atual na playlist

    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audio.src = track.audioSrc;
        albumCover.src = track.coverSrc;
        trackNameDisplay.textContent = track.name;
        artistDisplay.textContent = track.artist;
        document.body.style.backgroundImage = `url('${track.backgroundSrc}')`;
        audio.load(); // Carrega a nova música

        // Quando os metadados da música estiverem disponíveis, atualiza a duração
        audio.addEventListener("loadedmetadata", function() {
            const duration = formatTime(audio.duration);
            durationDisplay.textContent = duration;
        });
    }

    // Carrega a primeira música ao iniciar
    loadTrack(currentTrackIndex);

    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = "⏸️";
        } else {
            audio.pause();
            playPauseBtn.innerHTML = "&#9654;";
        }
    }

    playPauseBtn.addEventListener("click", playPause);

    audio.addEventListener("timeupdate", function() {
        const currentTime = formatTime(audio.currentTime);
        currentTimeDisplay.textContent = currentTime;

        // Atualiza a posição da seek bar
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
    });

    audio.addEventListener("ended", function() {
        // Avança para a próxima música ao finalizar a atual
        nextTrack();
    });

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playPause(); // Inicia a reprodução automaticamente da próxima música
    }

    nextBtn.addEventListener("click", nextTrack);

    prevBtn.addEventListener("click", function() {
        // Volta para a música anterior
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playPause(); // Inicia a reprodução automaticamente da música anterior
    });

    seekBar.addEventListener("input", function() {
        // Calcula o tempo baseado na posição da seek bar
        const seekTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
