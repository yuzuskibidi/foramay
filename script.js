        // Music Control  
        const musicBtn = document.getElementById('musicBtn');  
        const bgMusic = document.getElementById('bgMusic');  
        let isPlaying = false;  
          
        musicBtn.addEventListener('click', () => {  
            if (isPlaying) {  
                bgMusic.pause();  
                musicBtn.textContent = '🎵';  
                musicBtn.classList.remove('playing');  
            } else {  
                bgMusic.volume = 0.2;  
                bgMusic.play().catch(e => console.log('Audio play failed:', e));  
                musicBtn.textContent = '🎶';  
                musicBtn.classList.add('playing');  
            }  
            isPlaying = !isPlaying;  
        });  
          
        window.addEventListener('load', () => {  
            bgMusic.volume = 0.2;  
            bgMusic.play().then(() => {  
                musicBtn.textContent = '🎶';  
                musicBtn.classList.add('playing');  
                isPlaying = true;  
            }).catch(() => {});  
        });  
          
        const observerOptions = {  
            threshold: 0.2,  
            rootMargin: '0px 0px -50px 0px'  
        };  
          
        const observer = new IntersectionObserver((entries) => {  
            entries.forEach(entry => {  
                if (entry.isIntersecting) {  
                    const delay = entry.target.dataset.delay || 0;  
                    setTimeout(() => {  
                        entry.target.classList.add('visible');  
                    }, delay);  
                }  
            });  
        }, observerOptions);  
          
        document.querySelectorAll('.story-card').forEach(card => {  
            observer.observe(card);  
        });  
          
        window.addEventListener('scroll', () => {  
            const scrollHint = document.querySelector('.scroll-hint');  
            if (scrollHint && window.scrollY > 100) {  
                scrollHint.style.opacity = '0';  
                scrollHint.style.transition = 'opacity 0.5s';  
            }  
        });  
          
        function showHappy() {
            stopAllSongs();
            document.getElementById('questionSection').classList.add('hidden');  
            document.getElementById('happySection').classList.add('active');  
              
            if (!isPlaying) {  
                musicBtn.click();  
            }  
              
            createConfetti();  
            setInterval(createHeart, 300);  
            window.scrollTo({ top: 0, behavior: 'smooth' });  
        }  
          
        function createConfetti() {  
            const colors = ['#b39ddb', '#90caf9', '#ffb3ba', '#bae1ff', '#ffffba', '#baffc9', '#ffdfba'];  
            const container = document.getElementById('confettiContainer');  
              
            for (let i = 0; i < 60; i++) {  
                const confetti = document.createElement('div');  
                confetti.className = 'confetti';  
                confetti.style.left = Math.random() * 100 + '%';  
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];  
                confetti.style.animationDelay = Math.random() * 0.5 + 's';  
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';  
                container.appendChild(confetti);  
                  
                setTimeout(() => confetti.remove(), 4000);  
            }  
        }  
          
        function createHeart() {  
            const heart = document.createElement('div');  
            heart.className = 'heart';  
            heart.textContent = ['💙', '🤍', '💜', '💗'][Math.floor(Math.random() * 4)];  
            heart.style.left = Math.random() * 100 + '%';  
            heart.style.animationDuration = (Math.random() * 2 + 4) + 's';  
            document.body.appendChild(heart);  
              
            setTimeout(() => heart.remove(), 5000);  
        }  
          
        const noBtn = document.getElementById('noBtn');  
        const yesBtn = document.querySelector('.btn-choice:not(#noBtn)');  
          
        function moveNoButton() {  
            const parent = noBtn.parentElement;  
            const parentRect = parent.getBoundingClientRect();  
            const yesRect = yesBtn.getBoundingClientRect();  
              
            const minY = (yesRect.bottom - parentRect.top) + 30;  
            const maxX = parentRect.width - noBtn.offsetWidth;  
            const maxY = parentRect.height - noBtn.offsetHeight;  
            const randomX = Math.random() * maxX;  
            let randomY = minY + Math.random() * (maxY - minY);  
              
            if (randomY < minY) randomY = minY;  
              
            noBtn.style.position = 'absolute';  
            noBtn.style.left = randomX + 'px';  
            noBtn.style.top = randomY + 'px';  
        }  
          
        noBtn.addEventListener('mouseenter', moveNoButton);  
        noBtn.addEventListener('touchstart', moveNoButton);  
        noBtn.addEventListener('click', moveNoButton);  
          
        document.querySelectorAll('.btn-choice').forEach(btn => {  
            btn.addEventListener('click', function(e) {  
                const rect = this.getBoundingClientRect();  
                const x = e.clientX - rect.left;  
                const y = e.clientY - rect.top;  
                  
                for (let i = 0; i < 8; i++) {  
                    const sparkle = document.createElement('div');  
                    sparkle.textContent = '✨';  
                    sparkle.style.position = 'absolute';  
                    sparkle.style.left = x + 'px';  
                    sparkle.style.top = y + 'px';  
                    sparkle.style.pointerEvents = 'none';  
                    const randX = Math.random() * 100 - 50;
                    const randY = Math.random() * 100 - 50;
                    sparkle.style.setProperty('--x', randX + 'px');
                    sparkle.style.setProperty('--y', randY + 'px');
                    sparkle.style.animation = 'sparkleOut 1s ease-out forwards';  
                    this.appendChild(sparkle);  
                      
                    setTimeout(() => sparkle.remove(), 1000);  
                }  
            });  
        });

        // PLAYLIST FUNCTIONALITY - KODE BARU
        const playlistAudio = document.getElementById('playlistAudio');
        const songCards = document.querySelectorAll('.song-card');
        let currentSong = null;

        songCards.forEach(card => {
            card.addEventListener('click', function() {
                const songSrc = this.dataset.song;

                // Jika lagu yang sama diklik, pause/play
                if (currentSong === this) {
                    if (playlistAudio.paused) {
                        playlistAudio.play();
                        this.classList.add('playing');
                        // Pause background music
                        bgMusic.pause();
                        musicBtn.textContent = '🎵';
                        musicBtn.classList.remove('playing');
                        isPlaying = false;
                    } else {
                        playlistAudio.pause();
                        this.classList.remove('playing');
                    }
                } else {
                    // Hapus status playing dari semua card
                    songCards.forEach(c => c.classList.remove('playing'));
                    
                    // Set lagu baru
                    playlistAudio.src = songSrc;
                    playlistAudio.volume = 0.3;
                    playlistAudio.play().catch(e => console.log('Playlist play failed:', e));
                    
                    this.classList.add('playing');
                    currentSong = this;

                    // Pause background music
                    bgMusic.pause();
                    musicBtn.textContent = '🎵';
                    musicBtn.classList.remove('playing');
                    isPlaying = false;
                }
            });
        });

        // Auto remove playing status when song ends
        playlistAudio.addEventListener('ended', () => {
            if (currentSong) {
                currentSong.classList.remove('playing');
                currentSong = null;
            }
        });
        
        const specialCard = document.getElementById('specialSong');

specialCard.addEventListener('click', function () {
    const src = this.dataset.song;

    if (playlistAudio.src.includes(src)) {
        if (playlistAudio.paused) {
            playlistAudio.play();
            this.classList.add('playing');
        } else {
            playlistAudio.pause();
            this.classList.remove('playing');
        }
    } else {
        songCards.forEach(c => c.classList.remove('playing'));
        this.classList.add('playing');

        playlistAudio.src = src;
        playlistAudio.volume = 0.35;
        playlistAudio.play().catch(() => {});

        currentSong = this;

        bgMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    }
});

playlistAudio.addEventListener('ended', () => {
    specialCard.classList.remove('playing');
});

function stopAllSongs() {
    if (!playlistAudio.paused) {
        playlistAudio.pause();
        playlistAudio.currentTime = 0;
    }

    songCards.forEach(card => card.classList.remove('playing'));

    const specialCard = document.getElementById('specialSong');
    if (specialCard) specialCard.classList.remove('playing');

    currentSong = null;
}