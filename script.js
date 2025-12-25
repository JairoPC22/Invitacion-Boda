// ===== CONFIGURACIÓN =====
const weddingDate = new Date('2026-05-23T12:30:00').getTime();
const PHONE_NOVIO = '522311101451';
const PHONE_NOVIA = '522321765311';

// Variables globales
let guestName = 'Querido Invitado';
let guestCount = '';

// Variables de música
let player;
let playerReady = false;
let musicStarted = false;
let musicButton = null;
let apiReady = false;
let userInteracted = false;

// ===== CONTADOR REGRESIVO =====
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div style="font-family: var(--font-script); font-size: 4rem; color: var(--color-sage); padding: 50px;">
                <i class="fas fa-heart" style="color: var(--color-dusty-rose);"></i> 
                ¡Es hoy! 
                <i class="fas fa-heart" style="color: var(--color-dusty-rose);"></i>
            </div>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

// ===== PERSONALIZACIÓN =====
function loadInvitationData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        
        const invitado = urlParams.get('invitado') || urlParams.get('familia');
        if (invitado) {
            guestName = decodeURIComponent(invitado);
        }
        
        const personas = urlParams.get('personas') || urlParams.get('pases');
        if (personas) {
            guestCount = `Pase para ${personas} persona${personas > 1 ? 's' : ''}`;
        }
        
        const guestNameEl = document.getElementById('guestName');
        const guestCountEl = document.getElementById('guestCount');
        
        if (guestNameEl) {
            guestNameEl.textContent = guestName;
        }
        
        if (guestCountEl && guestCount) {
            guestCountEl.innerHTML = `<i class="fas fa-ticket-alt"></i> ${guestCount}`;
            guestCountEl.style.display = 'block';
        } else if (guestCountEl) {
            guestCountEl.style.display = 'none';
        }
    } catch (error) {
        // Silencioso
    }
}

// ===== CONTACTO WHATSAPP =====
function contactNovio(event) {
    event.preventDefault();
    
    const mensaje = `*CONFIRMACIÓN DE ASISTENCIA*

¡Hola Jairo!

Con mucho cariño confirmo mi asistencia a tu boda:

*Invitado:* ${guestName}
*Fecha:* Sábado, 23 de Mayo de 2026
*Hora:* 12:30 P.M.
*Lugar:* Rancho 3 Hermanos, Atempan, Puebla
${guestCount ? '*' + guestCount + '*' : ''}

¡Será un honor celebrar contigo este día tan especial!

Nos vemos pronto`;
    
    const url = `https://wa.me/${PHONE_NOVIO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function contactNovia(event) {
    event.preventDefault();
    
    const mensaje = `*CONFIRMACIÓN DE ASISTENCIA*

¡Hola Ceany!

Con mucho cariño confirmo mi asistencia a tu boda:

*Invitado:* ${guestName}
*Fecha:* Sábado, 23 de Mayo de 2026
*Hora:* 12:30 P.M.
*Lugar:* Rancho 3 Hermanos, Atempan, Puebla
${guestCount ? '*' + guestCount + '*' : ''}

¡Será un honor celebrar contigo este día tan especial!

Nos vemos pronto`;
    
    const url = `https://wa.me/${PHONE_NOVIA}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ===== ANIMACIONES =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        observer.observe(section);
    });
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
}

function initCardAnimations() {
    const cards = document.querySelectorAll('.detail-item, .hotel-item, .gift-card, .dress-code-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });
}

function initFloralFadeEffect() {
    const floralTop = document.querySelector('.floral-top-right');
    const floralBottom = document.querySelector('.floral-bottom-left');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollProgress = scrolled + windowHeight;
                
                if (floralTop && floralBottom) {
                    if (scrolled < 200 || scrollProgress > documentHeight - 200) {
                        floralTop.classList.remove('hidden');
                        floralBottom.classList.remove('hidden');
                    } else {
                        floralTop.classList.add('hidden');
                        floralBottom.classList.add('hidden');
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

function initPhotoAnimation() {
    const photoWrapper = document.querySelector('.photo-wrapper-fade');
    
    if (photoWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    photoWrapper.style.opacity = '1';
                    photoWrapper.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.2 });
        
        photoWrapper.style.opacity = '0';
        photoWrapper.style.transform = 'scale(0.95)';
        photoWrapper.style.transition = 'opacity 1s ease, transform 1s ease';
        
        observer.observe(photoWrapper);
    }
}

// ===== MÚSICA =====
function initBackgroundMusic() {
    // Cargar API de YouTube
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Función que YouTube llama cuando la API está lista
window.onYouTubeIframeAPIReady = function() {
    apiReady = true;
    console.log('YouTube API ready');
    
    // Crear el reproductor con AUTOPLAY ACTIVADO (se bloqueará hasta la interacción del usuario)
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'uMxMmcpcWHE',
        playerVars: {
            autoplay: 1,  // CAMBIADO A 1
            loop: 1,
            playlist: 'uMxMmcpcWHE',
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    playerReady = true;
    console.log('Player ready');
    
    // Configurar volumen
    event.target.setVolume(40);
    
    // Si el usuario ya interactuó antes de que el player estuviera listo
    if (userInteracted && !musicStarted) {
        console.log('User already interacted, starting music');
        try {
            event.target.unMute();
            event.target.playVideo();
            musicStarted = true;
        } catch (e) {
            console.error('Error auto-playing:', e);
        }
    }
    
    createMusicControl();
    
    // MOSTRAR EL OVERLAY AHORA QUE TODO ESTÁ LISTO
    showMusicOverlay();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        musicStarted = true;
        updateMusicButton(true);
        console.log('Music playing');
    } else if (event.data === YT.PlayerState.PAUSED) {
        updateMusicButton(false);
        console.log('Music paused');
    } else if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function updateMusicButton(isPlaying) {
    if (!musicButton) return;
    
    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-music"></i>';
        musicButton.classList.remove('paused');
    } else {
        musicButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicButton.classList.add('paused');
    }
}

function createMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.innerHTML = `
        <button id="toggle-music" class="music-button paused" title="Reproducir música">
            <i class="fas fa-volume-mute"></i>
        </button>
    `;
    document.body.appendChild(musicControl);
    
    musicButton = document.getElementById('toggle-music');
    
    const toggleMusic = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (!playerReady || !player) {
            console.log('Player not ready yet');
            return;
        }
        
        // Marcar que el usuario interactuó
        userInteracted = true;
        
        try {
            const state = player.getPlayerState();
            
            if (state === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                updateMusicButton(false);
            } else {
                // Unmute primero (importante en móviles)
                player.unMute();
                player.setVolume(40);
                player.playVideo();
                musicStarted = true;
                updateMusicButton(true);
                
                // Verificar después de 500ms
                setTimeout(() => {
                    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                        player.playVideo();
                    }
                }, 500);
            }
        } catch (error) {
            console.error('Error toggling music:', error);
        }
    };
    
    // Usar eventos nativos
    musicButton.onclick = toggleMusic;
    musicButton.ontouchend = (e) => {
        e.preventDefault();
        toggleMusic(e);
    };
}

// ===== OVERLAY DE MÚSICA =====
function initMusicOverlay() {
    const overlay = document.getElementById('music-overlay');
    const openButton = document.getElementById('open-invitation-btn');
    
    if (!overlay || !openButton) return;
    
    // Mantener el overlay oculto hasta que el player esté listo
    overlay.style.display = 'none';
    
    const startMusic = (e) => {
        console.log('Start music clicked - User interaction detected');
        userInteracted = true;
        
        // CRUCIAL: Ejecutar playVideo() SÍNCRONAMENTE dentro del evento de clic
        if (player && playerReady) {
            console.log('Executing playVideo() synchronously');
            
            try {
                // Método 1: Play directo
                player.playVideo();
                console.log('playVideo() called');
                
                // Método 2: Unmute por si está muteado (algunos móviles lo requieren)
                player.unMute();
                player.setVolume(40);
                
                musicStarted = true;
                if (musicButton) updateMusicButton(true);
                
                // Verificar después de 500ms si está reproduciendo
                setTimeout(() => {
                    const state = player.getPlayerState();
                    console.log('Player state after 500ms:', state);
                    if (state !== YT.PlayerState.PLAYING) {
                        console.log('Not playing, trying again');
                        player.playVideo();
                    }
                }, 500);
                
            } catch (error) {
                console.error('Error playing video:', error);
            }
        } else {
            console.log('Player not ready:', { player: !!player, playerReady });
        }
        
        // Ocultar el overlay
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    };
    
    // IMPORTANTE: Usar eventos nativos sin wrappers adicionales
    openButton.onclick = startMusic;
    
    // Para touch devices
    openButton.ontouchend = (e) => {
        e.preventDefault();
        startMusic(e);
    };
    
    // También permitir clic en todo el overlay
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            startMusic(e);
        }
    };
}

// Mostrar el overlay solo cuando el player esté listo
function showMusicOverlay() {
    const overlay = document.getElementById('music-overlay');
    if (overlay) {
        console.log('Showing music overlay - player is ready');
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    loadInvitationData();
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    initScrollAnimations();
    initTimelineAnimations();
    initCardAnimations();
    initFloralFadeEffect();
    initPhotoAnimation();
    initBackgroundMusic();
    
    // Inicializar el overlay (pero permanecerá oculto hasta que el player esté listo)
    initMusicOverlay();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease';
        document.body.style.opacity = '1';
    }, 200);
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('script')) {
        e.preventDefault();
    }
});

// Exportar funciones
window.contactNovio = contactNovio;
window.contactNovia = contactNovia;