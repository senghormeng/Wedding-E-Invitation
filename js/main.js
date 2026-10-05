/**
 * Main Application Logic for Wedding E-Invitation
 * Ratana & Naza Wedding
 */

document.addEventListener('DOMContentLoaded', () => {
    renderDynamicContent();
    initGuestPersonalization();
    initEnvelopeOpen();
    initCountdown();
    initScheduleTabs();
    initAudioController();
    initCopyActions();
    initGalleryLightbox();
    initGuestbook();
    initRsvpForm();
    initCalendarEvent();
    initScrollSpy();
    initSparklesCanvas();
});

/* ========================================================
   0. DYNAMIC CONTENT RENDERING FROM CONFIG.JS
   ======================================================== */
function renderDynamicContent() {
    let cfg = window.WEDDING_CONFIG || {};
    const localCustom = localStorage.getItem('wedding_custom_config');
    if (localCustom) {
        try {
            const parsed = JSON.parse(localCustom);
            cfg = Object.assign({}, cfg, parsed);
        } catch(e) {}
    }
    if (!cfg) return;
    
    // Browser Title
    if (cfg.groom && cfg.bride) {
        document.title = `${cfg.weddingTitle || 'អាពាហ៍ពិពាហ៍'} ${cfg.groom.khmerName} & ${cfg.bride.khmerName} | Wedding Invitation`;
    }

    // Front Page Cover Overlay Greeting
    const coverGreeting = document.getElementById('coverGreetingTitle');
    if (coverGreeting && cfg.coverGreeting) coverGreeting.textContent = cfg.coverGreeting;

    // Monogram Seal (initials)
    const sealText = document.getElementById('sealMonogramText');
    const footerMono = document.getElementById('footerMonogramText');
    let monogram = cfg.monogram;
    if (!monogram && cfg.groom && cfg.bride) {
        const gKhParts = cfg.groom.khmerName.trim().split(' ');
        const bKhParts = cfg.bride.khmerName.trim().split(' ');
        const gLastKh = gKhParts[gKhParts.length - 1];
        const bLastKh = bKhParts[bKhParts.length - 1];
        const gInit = gLastKh.charAt(0);
        const bInit = bLastKh.charAt(0);
        monogram = `${gInit}❤️${bInit}`;
    }
    if (monogram) {
        if (sealText) sealText.textContent = monogram;
        if (footerMono) footerMono.textContent = monogram;
    }

    // Footer Copyright
    const footCopy = document.getElementById('footerCopyrightText');
    if (footCopy && cfg.groom && cfg.bride) {
        const gEng = cfg.groom.englishName || cfg.groom.khmerName;
        const bEng = cfg.bride.englishName || cfg.bride.khmerName;
        const year = (cfg.weddingDateISO ? new Date(cfg.weddingDateISO).getFullYear() : 2026);
        footCopy.innerHTML = `&copy; ${year} ${gEng} &amp; ${bEng} Wedding. All Rights Reserved.`;
    }

    // Title & Hero
    const heroTitle = document.getElementById('heroCeremonyTitle');
    if (heroTitle && cfg.weddingTitle) heroTitle.textContent = cfg.weddingTitle;
    
    const heroGroom = document.getElementById('heroGroomName');
    const heroBride = document.getElementById('heroBrideName');
    if (cfg.weddingSubtitle && cfg.weddingSubtitle.includes('&')) {
        const subParts = cfg.weddingSubtitle.split('&');
        if (heroGroom) heroGroom.textContent = subParts[0].trim();
        if (heroBride) heroBride.textContent = subParts[1].trim();
    } else {
        if (heroGroom && cfg.groom) {
            const parts = cfg.groom.khmerName.trim().split(' ');
            heroGroom.textContent = parts[parts.length - 1];
        }
        if (heroBride && cfg.bride) {
            const parts = cfg.bride.khmerName.trim().split(' ');
            heroBride.textContent = parts[parts.length - 1];
        }
    }
    
    const heroDateKh = document.getElementById('heroDateKhmer');
    if (heroDateKh && cfg.weddingDateKhmer) heroDateKh.textContent = cfg.weddingDateKhmer;
    const heroDateEn = document.getElementById('heroDateEnglish');
    if (heroDateEn && cfg.weddingDateEnglish) heroDateEn.textContent = cfg.weddingDateEnglish;
    
    // Invitation message
    const invMsg = document.getElementById('invitationMessageText');
    if (invMsg && cfg.invitationMessage) invMsg.textContent = cfg.invitationMessage;
    
    // Groom & Bride details
    if (cfg.groom) {
        const gf = document.getElementById('groomFatherName');
        if (gf && cfg.groom.father) gf.textContent = cfg.groom.father;
        const gm = document.getElementById('groomMotherName');
        if (gm && cfg.groom.mother) gm.textContent = cfg.groom.mother;
        const gkn = document.getElementById('groomKhmerName');
        if (gkn && cfg.groom.khmerName) gkn.textContent = cfg.groom.khmerName;
        const gen = document.getElementById('groomEnglishName');
        if (gen && cfg.groom.englishName) gen.textContent = cfg.groom.englishName;
        const gp = document.getElementById('groomPhoto');
        if (gp && cfg.groom.photo) gp.src = cfg.groom.photo;
    }
    
    if (cfg.bride) {
        const bf = document.getElementById('brideFatherName');
        if (bf && cfg.bride.father) bf.textContent = cfg.bride.father;
        const bm = document.getElementById('brideMotherName');
        if (bm && cfg.bride.mother) bm.textContent = cfg.bride.mother;
        const bkn = document.getElementById('brideKhmerName');
        if (bkn && cfg.bride.khmerName) bkn.textContent = cfg.bride.khmerName;
        const ben = document.getElementById('brideEnglishName');
        if (ben && cfg.bride.englishName) ben.textContent = cfg.bride.englishName;
        const bp = document.getElementById('bridePhoto');
        if (bp && cfg.bride.photo) bp.src = cfg.bride.photo;
    }
    
    // Venue
    if (cfg.venue) {
        const vn = document.getElementById('venueNameText');
        if (vn && cfg.venue.name) vn.textContent = cfg.venue.name;
        const va = document.getElementById('venueAddressText');
        if (va && cfg.venue.address) va.textContent = cfg.venue.address;
        const vmap = document.getElementById('venueGoogleMapsBtn');
        if (vmap && cfg.venue.googleMapsUrl) vmap.href = cfg.venue.googleMapsUrl;
        const viframe = document.getElementById('venueMapIframe');
        if (viframe && cfg.venue.embedMapUrl) viframe.src = cfg.venue.embedMapUrl;
    }
    
    // Gift / Bank
    if (cfg.gift) {
        const gan = document.getElementById('giftAccName');
        if (gan && cfg.gift.accountName) gan.textContent = cfg.gift.accountName;
        const gnum = document.getElementById('giftAccNumber');
        if (gnum && cfg.gift.accountNumber) gnum.textContent = cfg.gift.accountNumber;
        const gbn = document.getElementById('giftBankName');
        if (gbn && cfg.gift.bankName) gbn.textContent = cfg.gift.bankName;
        const gqr = document.getElementById('giftQrImage');
        if (gqr && cfg.gift.qrImage) gqr.src = cfg.gift.qrImage;
    }
    
    // Schedule Timelines
    if (cfg.schedule) {
        if (cfg.schedule.morning && cfg.schedule.morning.length > 0) {
            const mTimeline = document.getElementById('timelineMorning');
            if (mTimeline) {
                mTimeline.innerHTML = cfg.schedule.morning.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-card">
                            <span class="timeline-time-badge">${item.time}</span>
                            <h4 class="timeline-title">${item.title}</h4>
                            <p class="timeline-desc">${item.desc || ''}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        if (cfg.schedule.evening && cfg.schedule.evening.length > 0) {
            const eTimeline = document.getElementById('timelineEvening');
            if (eTimeline) {
                eTimeline.innerHTML = cfg.schedule.evening.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-card">
                            <span class="timeline-time-badge">${item.time}</span>
                            <h4 class="timeline-title">${item.title}</h4>
                            <p class="timeline-desc">${item.desc || ''}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // Music button tooltip
    const musicTooltip = document.getElementById('musicTooltipText');
    if (musicTooltip && cfg.bgMusic && cfg.bgMusic.title) {
        musicTooltip.textContent = `តន្ត្រីកំដរ៖ ${cfg.bgMusic.title}`;
    }
}

// Helper to extract clean YouTube Video ID from URL or string
function extractYoutubeId(input) {
    if (!input) return 'uTfXs8EPDmc';
    input = String(input).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
        return input;
    }
    const shortMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];
    const longMatch = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (longMatch) return longMatch[1];
    const embedMatch = input.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    return 'uTfXs8EPDmc';
}

/* ========================================================
   1. GUEST PERSONALIZATION VIA URL PARAMETER
   Example: ?to=ឯកឧត្តម+សុខ+សាន or ?name=John
   ======================================================== */
function initGuestPersonalization() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('name') || urlParams.get('for');
    
    const guestNameEl = document.getElementById('guestNameText');
    const guestCardEl = document.getElementById('guestCardBox');
    
    if (guestName && guestName.trim() !== '') {
        const decodedName = decodeURIComponent(guestName.trim());
        if (guestNameEl) guestNameEl.textContent = decodedName;
        if (guestCardEl) guestCardEl.style.display = 'inline-flex';
    } else {
        if (guestNameEl) guestNameEl.textContent = 'ភ្ញៀវកិត្តិយសដ៏ខ្ពង់ខ្ពស់';
        if (guestCardEl) guestCardEl.style.display = 'none';
    }
}

/* ========================================================
   2. ENVELOPE / WELCOME OVERLAY
   ======================================================== */
function initEnvelopeOpen() {
    const openBtn = document.getElementById('btnOpenEnvelope');
    const overlay = document.getElementById('welcomeOverlay');
    
    if (!overlay) return;
    
    let isOpened = false;
    
    const handleOpen = (e) => {
        if (isOpened) return;
        isOpened = true;
        
        if (e && e.cancelable && e.type !== 'click') {
            e.preventDefault();
        }
        
        // Add opened class to trigger animation
        overlay.classList.add('opened');
        document.body.classList.add('envelope-open');
        document.documentElement.classList.add('envelope-open');
        
        // Remove overlay from rendering flow after transition so it never blocks clicks/touches
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 850);
        
        // Start romantic background music safely
        try {
            playBackgroundAudio();
        } catch(err) {
            console.warn('Audio play error:', err);
        }
        
        // Smooth scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // 1. Direct button tap/click
    if (openBtn) {
        openBtn.addEventListener('click', handleOpen);
        openBtn.addEventListener('touchend', handleOpen, { passive: false });
    }
    
    // 2. Tap anywhere on the cover overlay to open (intuitive for mobile/tablet)
    overlay.addEventListener('click', handleOpen);
    overlay.addEventListener('touchend', (e) => {
        if (!isOpened) {
            handleOpen(e);
        }
    }, { passive: true });
    
    // 3. Swipe-up gesture support
    let touchStartY = 0;
    overlay.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });
    
    overlay.addEventListener('touchmove', (e) => {
        if (isOpened) return;
        if (e.touches && e.touches.length > 0) {
            const currentY = e.touches[0].clientY;
            if (touchStartY - currentY > 40) {
                handleOpen(e);
            }
        }
    }, { passive: true });
}

/* ========================================================
   3. BACKGROUND AUDIO CONTROLLER
   ======================================================== */
let htmlAudio = null;
let isAudioPlaying = false;
let audioCtx = null;
let audioTimer = null;

function initAudioController() {
    const musicBtn = document.getElementById('musicToggleBtn');
    htmlAudio = document.getElementById('bgAudioElement');
    
    if (htmlAudio) {
        htmlAudio.addEventListener('playing', () => {
            isAudioPlaying = true;
            if (musicBtn) musicBtn.classList.add('playing');
        });
        htmlAudio.addEventListener('pause', () => {
            isAudioPlaying = false;
            if (musicBtn) musicBtn.classList.remove('playing');
        });
    }
    
    if (!musicBtn) return;
    
    const toggleMusic = (e) => {
        if (e) e.stopPropagation();
        if (isAudioPlaying) {
            pauseBackgroundAudio();
        } else {
            playBackgroundAudio();
        }
    };
    
    musicBtn.addEventListener('click', toggleMusic);
    musicBtn.addEventListener('touchend', toggleMusic);
}

function playBackgroundAudio() {
    const musicBtn = document.getElementById('musicToggleBtn');
    if (!htmlAudio) {
        htmlAudio = document.getElementById('bgAudioElement');
    }
    
    if (htmlAudio) {
        try { htmlAudio.volume = 1.0; } catch(e) {}
        
        const playPromise = htmlAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isAudioPlaying = true;
                if (audioTimer) {
                    clearInterval(audioTimer);
                    audioTimer = null;
                }
                if (musicBtn) musicBtn.classList.add('playing');
            }).catch(err => {
                console.warn('Audio play restricted by browser policy; unlocking on next touch:', err);
                // Unlocks audio automatically on next tap anywhere on the screen
                const unlockAudio = () => {
                    if (htmlAudio) {
                        htmlAudio.play().then(() => {
                            isAudioPlaying = true;
                            if (musicBtn) musicBtn.classList.add('playing');
                        }).catch(() => {});
                    }
                    document.removeEventListener('touchend', unlockAudio);
                    document.removeEventListener('click', unlockAudio);
                };
                document.addEventListener('touchend', unlockAudio, { once: true });
                document.addEventListener('click', unlockAudio, { once: true });
            });
            return;
        } else {
            isAudioPlaying = true;
            if (musicBtn) musicBtn.classList.add('playing');
            return;
        }
    }
    
    startProceduralHarp();
}

function pauseBackgroundAudio() {
    const musicBtn = document.getElementById('musicToggleBtn');
    isAudioPlaying = false;
    
    if (htmlAudio) {
        htmlAudio.pause();
    }
    
    if (audioTimer) {
        clearInterval(audioTimer);
        audioTimer = null;
    }
    
    if (musicBtn) musicBtn.classList.remove('playing');
}

/**
 * Romantic Cambodian Wedding Harp / Celesta Procedural Music
 * Generates an elegant, soothing acoustic arpeggio using Web Audio API
 */
function startProceduralHarp() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        isAudioPlaying = true;
        currentAudioMode = 'procedural';
        const musicBtn = document.getElementById('musicToggleBtn');
        if (musicBtn) musicBtn.classList.add('playing');
        
        // Romantic pentatonic / wedding notes (Hz)
        const chords = [
            [261.63, 329.63, 392.00, 523.25], // C Major
            [220.00, 261.63, 329.63, 440.00], // A Minor
            [174.61, 220.00, 261.63, 349.23], // F Major
            [196.00, 246.94, 293.66, 392.00]  // G Major
        ];
        
        let chordIndex = 0;
        let noteIndex = 0;
        
        if (audioTimer) clearInterval(audioTimer);
        
        audioTimer = setInterval(() => {
            if (!isAudioPlaying || !audioCtx) return;
            
            const currentChord = chords[chordIndex];
            const freq = currentChord[noteIndex % currentChord.length];
            playPluckNote(freq);
            
            noteIndex++;
            if (noteIndex >= currentChord.length * 2) {
                noteIndex = 0;
                chordIndex = (chordIndex + 1) % chords.length;
            }
        }, 380);
        
    } catch (e) {
        console.log('Audio init notice:', e);
    }
}

function playPluckNote(freq) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 1.25);
}

/* ========================================================
   4. COUNTDOWN TIMER
   ======================================================== */
function initCountdown() {
    const targetDate = new Date(WEDDING_CONFIG.weddingDateISO).getTime();
    
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minsEl) minsEl.textContent = '00';
            if (secsEl) secsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ========================================================
   5. SCHEDULE / PROGRAM TABS
   ======================================================== */
function initScheduleTabs() {
    const morningTabBtn = document.getElementById('tabMorning');
    const eveningTabBtn = document.getElementById('tabEvening');
    const morningTimeline = document.getElementById('timelineMorning');
    const eveningTimeline = document.getElementById('timelineEvening');
    
    if (!morningTabBtn || !eveningTabBtn) return;
    
    morningTabBtn.addEventListener('click', () => {
        morningTabBtn.classList.add('active');
        eveningTabBtn.classList.remove('active');
        if (morningTimeline) morningTimeline.style.display = 'block';
        if (eveningTimeline) eveningTimeline.style.display = 'none';
    });
    
    eveningTabBtn.addEventListener('click', () => {
        eveningTabBtn.classList.add('active');
        morningTabBtn.classList.remove('active');
        if (morningTimeline) morningTimeline.style.display = 'none';
        if (eveningTimeline) eveningTimeline.style.display = 'block';
    });
}

/* ========================================================
   6. COPY ACTIONS (Account Number & Address)
   ======================================================== */
function initCopyActions() {
    // Copy Account Number
    const copyAccBtn = document.getElementById('btnCopyAccount');
    if (copyAccBtn) {
        copyAccBtn.addEventListener('click', () => {
            const accNum = WEDDING_CONFIG.gift.accountNumber;
            copyToClipboard(accNum, 'បានចម្លងលេខគណនីរួចរាល់! (' + accNum + ')');
        });
    }
    
    // Copy Venue Address
    const copyAddrBtn = document.getElementById('btnCopyAddress');
    if (copyAddrBtn) {
        copyAddrBtn.addEventListener('click', () => {
            const addr = WEDDING_CONFIG.venue.name + ' ' + WEDDING_CONFIG.venue.address;
            copyToClipboard(addr, 'បានចម្លងទីតាំងរួចរាល់!');
        });
    }
}

function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message);
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
}

function fallbackCopy(text, message) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        showToast(message);
    } catch (e) {
        showToast('សូមចម្លងដោយដៃ៖ ' + text);
    }
    document.body.removeChild(ta);
}

function showToast(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
    `;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ========================================================
   7. PHOTO GALLERY LIGHTBOX
   ======================================================== */
function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryLightbox');
    const modalImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    
    if (!modal || !modalImg) return;
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-full') || item.querySelector('img').src;
            modalImg.src = src;
            modal.classList.add('active');
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ========================================================
   8. GUESTBOOK / WISHES SYSTEM
   ======================================================== */
const WISHES_STORAGE_KEY = 'wedding_wishes_senghor_vicheka';

function initGuestbook() {
    const form = document.getElementById('wishForm');
    const chips = document.querySelectorAll('.chip-blessing');
    const messageInput = document.getElementById('wishMessageInput');
    
    // Clear old template wishes from browser storage
    try {
        localStorage.removeItem('ratana_naza_wishes');
    } catch(e) {}
    
    // Quick chips autofill
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (messageInput) {
                const current = messageInput.value.trim();
                const text = chip.getAttribute('data-text') || chip.textContent;
                messageInput.value = current ? current + ' ' + text : text;
                messageInput.focus();
            }
        });
    });
    
    // Load wishes from LocalStorage (empty initially, ready for real guests)
    let wishes = [];
    try {
        const stored = localStorage.getItem(WISHES_STORAGE_KEY);
        if (stored) {
            wishes = JSON.parse(stored);
        }
    } catch (e) {
        wishes = [];
    }
    
    renderWishes(wishes);
    
    // Submit new wish
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('wishNameInput');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const msg = messageInput ? messageInput.value.trim() : '';
            
            if (!name || !msg) {
                showToast('សូមបំពេញឈ្មោះ និងពាក្យជូនពររបស់អ្នក');
                return;
            }
            
            const newWish = {
                name: name,
                time: "អម្បាញ់មិញ",
                message: msg
            };
            
            wishes.unshift(newWish);
            try {
                localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
            } catch (err) {}
            
            renderWishes(wishes);
            if (form) form.reset();
            showToast('អរគុណច្រើនចំពោះពាក្យជូនពរដ៏មានអត្ថន័យ! ❤️');
        });
    }
}

function renderWishes(wishes) {
    const listEl = document.getElementById('wishesList');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    if (!wishes || wishes.length === 0) {
        listEl.innerHTML = `
            <div class="empty-wishes-box" style="text-align: center; padding: 30px 20px; color: #8a7863; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border: 1px dashed rgba(198, 146, 41, 0.35); margin-top: 15px;">
                <span style="font-size: 22px; display: block; margin-bottom: 6px;">💌</span>
                <p style="font-size: 14px; margin: 0; line-height: 1.6;">មិនទាន់មានពាក្យជូនពរនៅឡើយទេ។<br>សូមក្លាយជាភ្ញៀវកិត្តិយសដំបូងគេដែលផ្ញើពាក្យជូនពរដល់គូស្វាមីភរិយាថ្មី! ✨</p>
            </div>
        `;
        return;
    }
    
    wishes.forEach(w => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `
            <div class="wish-header">
                <span class="wish-author">${escapeHtml(w.name)}</span>
                <span class="wish-time">${escapeHtml(w.time)}</span>
            </div>
            <p class="wish-text">${escapeHtml(w.message)}</p>
        `;
        listEl.appendChild(item);
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/* ========================================================
   9. RSVP FORM (Telegram Integration)
   ======================================================== */
function initRsvpForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let cfg = window.WEDDING_CONFIG || {};
        const localCustom = localStorage.getItem('wedding_custom_config');
        if (localCustom) {
            try { cfg = Object.assign({}, cfg, JSON.parse(localCustom)); } catch(err) {}
        }

        const name = document.getElementById('rsvpNameInput')?.value.trim();
        const guests = document.getElementById('rsvpGuestCount')?.value;
        const sessionRadio = document.querySelector('input[name="rsvpSession"]:checked');
        const session = sessionRadio ? sessionRadio.value : 'ពេញមួយថ្ងៃ';
        
        if (!name) {
            showToast('សូមបញ្ចូលឈ្មោះរបស់អ្នក');
            return;
        }
        
        const couple = cfg.weddingSubtitle || 'សេងហ័រ & វិច្ឆិកា';
        const text = encodeURIComponent(
            `💍 បញ្ជាក់ការចូលរួមអាពាហ៍ពិពាហ៍ ${couple}\n` +
            `👤 ឈ្មោះភ្ញៀវ៖ ${name}\n` +
            `👥 ចំនួនអ្នកចូលរួម៖ ${guests} នាក់\n` +
            `⏰ ចូលរួម៖ ${session}\n` +
            `សូមអរគុណ!`
        );
        
        const username = (cfg.contact && cfg.contact.telegramUsername) || 'Senghor_Vicheka_wedding';
        const tgUrl = `https://t.me/${username}?text=${text}`;
        
        window.open(tgUrl, '_blank');
        showToast('សូមអរគុណសម្រាប់ការបញ្ជាក់ការចូលរួម!');
    });
}

/* ========================================================
   10. ADD TO CALENDAR EVENT
   ======================================================== */
function initCalendarEvent() {
    const calBtn = document.getElementById('btnAddCalendar');
    if (!calBtn) return;
    
    calBtn.addEventListener('click', () => {
        let cfg = window.WEDDING_CONFIG || {};
        const localCustom = localStorage.getItem('wedding_custom_config');
        if (localCustom) {
            try { cfg = Object.assign({}, cfg, JSON.parse(localCustom)); } catch(err) {}
        }

        const title = encodeURIComponent((cfg.weddingTitle || 'សិរីមង្គលអាពាហ៍ពិពាហ៍') + " " + (cfg.weddingSubtitle || 'សេងហ័រ & វិច្ឆិកា'));
        const details = encodeURIComponent((cfg.invitationMessage || '') + "\n" + (cfg.venue?.name || ''));
        const location = encodeURIComponent((cfg.venue?.name || '') + ", " + (cfg.venue?.address || ''));
        
        // Calculate dates from weddingDateISO (defaults to Nov 22, 2026)
        let dateStartStr = "20261122T000000Z";
        let dateEndStr = "20261122T150000Z";
        if (cfg.weddingDateISO) {
            try {
                const d = new Date(cfg.weddingDateISO);
                const year = d.getUTCFullYear();
                const month = String(d.getUTCMonth() + 1).padStart(2, '0');
                const day = String(d.getUTCDate()).padStart(2, '0');
                dateStartStr = `${year}${month}${day}T000000Z`;
                dateEndStr = `${year}${month}${day}T150000Z`;
            } catch(e) {}
        }
        const dates = `${dateStartStr}/${dateEndStr}`;
        const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
        
        window.open(gcalUrl, '_blank');
    });
}

/* ========================================================
   11. SCROLLSPY FOR BOTTOM NAVIGATION
   ======================================================== */
function initScrollSpy() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/* ========================================================
   12. FALLING GOLDEN SPARKLES CANVAS
   ======================================================== */
function initSparklesCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'sparklesCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    canvas.style.opacity = '0.6';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    const sparkles = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        sparkles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.7 + 0.3,
            fade: Math.random() * 0.02 + 0.005
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        sparkles.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#d4af37';
            ctx.fill();
            
            s.y += s.speedY;
            s.x += s.speedX;
            s.opacity += s.fade;
            
            if (s.opacity > 0.8 || s.opacity < 0.2) {
                s.fade = -s.fade;
            }
            
            if (s.y > height) {
                s.y = -10;
                s.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
}
