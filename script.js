// ===== CONFIGURACIÓN =====
const weddingDate = new Date('2026-05-23T12:30:00').getTime();
const PHONE_NOVIO = '522311101451';
const PHONE_NOVIA = '522321765311';

// Variables globales
let guestName = 'Querido Invitado';
let guestCount = '';

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
        // Error silencioso
    }
}

// ===== CONTACTO POR WHATSAPP =====
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

// ===== MÚSICA DE FONDO - OPTIMIZADO PARA MÓVILES =====
let player;
let playerReady = false;
let musicStarted = false;

function initBackgroundMusic() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Mostrar indicador para móviles después de 2 segundos
    setTimeout(() => {
        if (!musicStarted) {
            showMusicHint();
        }
    }, 2000);
}

// Mostrar hint sutil para activar música
function showMusicHint() {
    const hint = document.createElement('div');
    hint.id = 'music-hint';
    hint.innerHTML = `
        <div class="music-hint-content">
            <i class="fas fa-hand-pointer"></i>
            <span>Toca para escuchar música</span>
        </div>
    `;
    document.body.appendChild(hint);
    
    // Animar entrada
    setTimeout(() => {
        hint.style.opacity = '1';
        hint.style.transform = 'translateY(0)';
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (hint.parentNode) {
                hint.remove();
            }
        }, 500);
    }, 4000);
}

window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'uMxMmcpcWHE',
        playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: 'uMxMmcpcWHE',
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    playerReady = true;
    event.target.setVolume(40);
    
    // MÚLTIPLES EVENTOS PARA CAPTURAR INTERACCIÓN EN MÓVIL
    const startMusic = (e) => {
        // No activar si es el botón de música
        if (e.target && e.target.closest('#music-control')) return;
        
        if (playerReady && player && !musicStarted) {
            player.playVideo();
            musicStarted = true;
            
            // Remover hint si existe
            const hint = document.getElementById('music-hint');
            if (hint) {
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 300);
            }
            
            // Remover todos los listeners
            document.removeEventListener('touchstart', startMusic);
            document.removeEventListener('touchend', startMusic);
            document.removeEventListener('click', startMusic);
            window.removeEventListener('scroll', startMusic);
        }
    };
    
    // AGREGAR MÚLTIPLES LISTENERS PARA MÓVIL
    document.addEventListener('touchstart', startMusic, { passive: true });
    document.addEventListener('touchend', startMusic, { passive: true });
    document.addEventListener('click', startMusic);
    
    // También con scroll (aunque menos efectivo en móvil)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!musicStarted) {
                startMusic({ target: document.body });
            }
        }, 100);
    }, { passive: true });
    
    createMusicControl();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !musicStarted) {
        musicStarted = true;
    }
    
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function createMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.innerHTML = `
        <button id="toggle-music" class="music-button" title="Pausar/Reproducir música">
            <i class="fas fa-music"></i>
        </button>
    `;
    document.body.appendChild(musicControl);
    
    const toggleBtn = document.getElementById('toggle-music');
    let isPlaying = true;
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (playerReady && player) {
            if (isPlaying) {
                player.pauseVideo();
                toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                toggleBtn.classList.add('paused');
                isPlaying = false;
            } else {
                player.playVideo();
                toggleBtn.innerHTML = '<i class="fas fa-music"></i>';
                toggleBtn.classList.remove('paused');
                isPlaying = true;
                musicStarted = true;
            }
        }
    });
    
    // También con touch para móvil
    toggleBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBtn.click();
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    loadInvitationData();
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    initScrollAnimations();
    initTimelineAnimations();
    initCardAnimations();
    initFloralFadeEffect();
    initPhotoAnimation();
    initBackgroundMusic();
    
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