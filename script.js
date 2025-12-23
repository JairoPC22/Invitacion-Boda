// ===== CONFIGURACIÓN =====
const weddingDate = new Date('2026-05-23T12:30:00').getTime();
const PHONE_NOVIO = '522311101451';
const PHONE_NOVIA = '522321765311';

// Variables globales para la invitación
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

// ===== PERSONALIZACIÓN DE INVITACIÓN =====
function loadInvitationData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Obtener nombre del invitado
        const invitado = urlParams.get('invitado') || urlParams.get('familia');
        if (invitado) {
            guestName = decodeURIComponent(invitado);
        }
        
        // Obtener número de personas
        const personas = urlParams.get('personas') || urlParams.get('pases');
        if (personas) {
            guestCount = `Pase para ${personas} persona${personas > 1 ? 's' : ''}`;
        }
        
        // Actualizar el DOM
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
    }
}

// ===== CONTACTO POR WHATSAPP CON MENSAJES ELEGANTES =====
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

// ===== CAMBIAR FOTO DE LOS NOVIOS =====
function changeCouplePhoto(imageUrl) {
    const photoElement = document.getElementById('couplePhoto');
    if (photoElement && imageUrl) {
        photoElement.src = imageUrl;
        photoElement.alt = 'Jairo y Ceany - Nuestra Historia de Amor';
    }
}

// ===== ANIMACIONES MEJORADAS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
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
        section.style.transform = 'translateY(70px)';
        section.style.transition = 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1), transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)';
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
                }, index * 350);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-60px)';
        item.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ANIMACIÓN DE ENTRADA DE CARDS =====
function initCardAnimations() {
    const cards = document.querySelectorAll('.detail-item, .hotel-item, .gift-card, .dress-code-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 180);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(card);
    });
}

// ===== EFECTO FADE FLORES AL HACER SCROLL =====
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
                
                // Ambas flores: visibles solo arriba (primeros 300px) o abajo (últimos 300px del footer)
                if (floralTop && floralBottom) {
                    if (scrolled < 300 || scrollProgress > documentHeight - 300) {
                        // Mostrar flores cuando estamos arriba o en el footer
                        floralTop.classList.remove('hidden');
                        floralBottom.classList.remove('hidden');
                    } else {
                        // Ocultar flores en el medio
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

// ===== ANIMACIÓN DE FOTO AL APARECER =====
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
        }, { threshold: 0.3 });
        
        photoWrapper.style.opacity = '0';
        photoWrapper.style.transform = 'scale(0.95)';
        photoWrapper.style.transition = 'opacity 1.4s ease, transform 1.4s ease';
        
        observer.observe(photoWrapper);
    }
}
// ===== MÚSICA DE FONDO =====
let player;
let playerReady = false;
let musicStarted = false;

function initBackgroundMusic() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
    
    
    // Activar música con el PRIMER clic en CUALQUIER parte
    document.addEventListener('click', function startMusicOnce(e) {
        // No activar si es el botón de música (para no duplicar)
        if (e.target.closest('#music-control')) return;
        
        if (playerReady && player && !musicStarted) {
            player.playVideo();
            musicStarted = true;
            // Remover listener
            document.removeEventListener('click', startMusicOnce);
        }
    }, true); // true = capture phase, se ejecuta antes que otros handlers
    
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
}
// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de invitación
    loadInvitationData();
    
    // Iniciar contador
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Inicializar animaciones
    initScrollAnimations();
    initTimelineAnimations();
    initCardAnimations();
    initSmoothScroll();
    initFloralFadeEffect();
    initPhotoAnimation();
    initBackgroundMusic();

    
    // Efecto fade-in inicial más suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 2s ease';
        document.body.style.opacity = '1';
    }, 250);
    
    // Lazy loading de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Precarga de fuentes
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em Playfair Display'),
            document.fonts.load('1em Allura'),
            document.fonts.load('1em Cormorant Garamond'),
            document.fonts.load('1em Cinzel')
        ]).then(() => {
        });
    }
});

// ===== PREVENIR ERRORES =====
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('script')) {
        e.preventDefault();
    }
});

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====
// Debounce para resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalcular elementos si es necesario
    }, 250);
});

// ===== FUNCIONES AUXILIARES =====
// Función para compartir invitación (opcional)
function shareInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Invitación Boda - Jairo & Ceany',
            text: 'Estás invitado a nuestra boda! 23 de Mayo, 2026',
            url: window.location.href
        }).then(() => {
        }).catch((error) => {
        });
    }
}

// Exportar funciones para uso global
window.changeCouplePhoto = changeCouplePhoto;
window.contactNovio = contactNovio;
window.contactNovia = contactNovia;
window.shareInvitation = shareInvitation;