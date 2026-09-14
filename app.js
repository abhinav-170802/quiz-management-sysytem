// Audio Context Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const t = audioCtx.currentTime;
    if (type === 'tick') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(800, t); osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
        gainNode.gain.setValueAtTime(0.5, t); gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
        osc.start(t); osc.stop(t + 0.05);
    } else if (type === 'fastTick') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(1200, t); osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
        gainNode.gain.setValueAtTime(0.8, t); gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
        osc.start(t); osc.stop(t + 0.05);
    } else if (type === 'timeout') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, t); osc.frequency.exponentialRampToValueAtTime(50, t + 0.5);
        gainNode.gain.setValueAtTime(0.8, t); gainNode.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.start(t); osc.stop(t + 0.5);
    } else if (type === 'success') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(400, t); osc.frequency.setValueAtTime(600, t + 0.1); osc.frequency.setValueAtTime(1000, t + 0.2);
        gainNode.gain.setValueAtTime(0.5, t); gainNode.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.start(t); osc.stop(t + 0.5);
    } else if (type === 'fail') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, t); osc.frequency.exponentialRampToValueAtTime(100, t + 0.5);
        gainNode.gain.setValueAtTime(0.5, t); gainNode.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.start(t); osc.stop(t + 0.5);
    }
}
// UI sounds explicitly removed per strict requirements

// Game State
const safeUser = localStorage.getItem('cq_user') || 'guest';
// Legacy Migration script targeting legacy users caught between DB architectural transitions
if (!localStorage.getItem('cq_progress_' + safeUser) && localStorage.getItem('cq_progress')) {
    localStorage.setItem('cq_progress_' + safeUser, localStorage.getItem('cq_progress'));
}
if (!localStorage.getItem('cq_stars_' + safeUser) && localStorage.getItem('cq_stars')) {
    localStorage.setItem('cq_stars_' + safeUser, localStorage.getItem('cq_stars'));
}

const state = {
    username: localStorage.getItem('cq_user') || null,
    avatar: localStorage.getItem('cq_avatar_' + safeUser) || '👨‍💻',
    progress: JSON.parse(localStorage.getItem('cq_progress_' + safeUser)) || {
        'Beginner': 0, 'Intermediate': 0, 'Advanced': 0, 'Competitive Battles': 0
    },
    starsCount: parseInt(localStorage.getItem('cq_stars_' + safeUser)) || 0,
    currentMode: null,
    currentLevel: 0,
    currentQuestionIndex: 0,
    timer: null,
    timeLeft: 60,
    totalTime: 60
};

// Mode Configuration
const modeConfig = {
    'Beginner': { time: 60, unlocksAt: null },
    'Intermediate': { time: 120, unlocksAt: { mode: 'Beginner', level: 10 } },
    'Advanced': { time: 180, unlocksAt: { mode: 'Intermediate', level: 10 } },
    'Competitive Battles': { time: 60, unlocksAt: { mode: 'Advanced', level: 5 } }
};

// Initialization
/* View management is now handled by multi-page architecture. 
   Initialization happens inside individual HTML files. */

// Auth Functions
function setupAuthListeners() {
    const loginForm = document.getElementById('loginForm');
    // LoginForm submission is now entirely handled by inline script in index.html
    // to correctly support the User/Admin slider logic.

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Form logic is natively handled in script.js which sends the OTP.
        // We do not override it here anymore.
    }
}
// Ensure auth listeners are added if we are on index.html
document.addEventListener('DOMContentLoaded', setupAuthListeners);

function logoutUser() {
    localStorage.removeItem('cq_user');
    state.username = null;
    window.location.href = 'index.html';
}

// Avatar Functions
function closeAvatarModal() {
    document.getElementById('avatar-modal').classList.add('hidden');
    const url = document.getElementById('avatarUrlInput').value;
    if (url) {
        state.avatar = `<img src="${url}" alt="avatar">`;
        localStorage.setItem('cq_avatar_' + (state.username || 'guest'), state.avatar);
        updateAvatarDisplay();
    }
}

function handleLocalImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            state.avatar = `<img src="${e.target.result}" alt="avatar" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
            localStorage.setItem('cq_avatar_' + (state.username || 'guest'), state.avatar);
            updateAvatarDisplay();
            document.getElementById('avatar-modal').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function selectAvatar(emoji) {
    state.avatar = emoji;
    localStorage.setItem('cq_avatar_' + (state.username || 'guest'), state.avatar);
    updateAvatarDisplay();
    document.getElementById('avatar-modal').classList.add('hidden');
}

function updateAvatarDisplay() {
    const avatarEl = document.getElementById('userAvatar');
    avatarEl.innerHTML = state.avatar;
}

// Dashboard Functions
async function initDashboard() {
    const dashUsername = document.getElementById('dashUsername');
    if (!dashUsername) return; // Exit if not on dashboard page

    try {
        const res = await fetch('get_questions.php');
        const data = await res.json();
        if (data.success && data.questions && Object.keys(data.questions).length > 0) {
            questions = data.questions;
        }
    } catch (e) {
        console.error('Database fetch failed: Using offline questions.js array', e);
    }

    dashUsername.textContent = state.username;
    updateAvatarDisplay();

    let localProgXp = 0;
    Object.values(state.progress).forEach(p => localProgXp += p * 100);
    let dbXp = parseInt(localStorage.getItem('cq_db_xp_' + state.username)) || 0;
    let totalScore = Math.max(localProgXp, dbXp);
    
    document.getElementById('dashScore').textContent = totalScore;
    document.getElementById('dashStars').textContent = state.starsCount;

    // Load Streak
    let lastActive = localStorage.getItem('cq_lastActive_' + (state.username || 'guest'));
    let streak = parseInt(localStorage.getItem('cq_streak_' + (state.username || 'guest'))) || 0;
    const today = new Date().toDateString();

    if (lastActive !== today) {
        if (lastActive) {
            const lastDate = new Date(lastActive);
            const diffTime = Math.abs(new Date() - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                streak++; // consecutive day
            } else {
                streak = 1; // broken streak
            }
        } else {
            streak = 1; // first day
        }
        localStorage.setItem('cq_lastActive_' + (state.username || 'guest'), today);
        localStorage.setItem('cq_streak_' + (state.username || 'guest'), streak.toString());
    }
    document.getElementById('dashStreak').textContent = streak + ' 🔥';

    // Calculate Extended Gamified Rank
    const ranks = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const rankColors = ['#cd7f32', '#c0c0c0', '#ffd700', '#e5e4e2'];
    const rankIndex = Math.min(Math.floor(totalScore / 1000), ranks.length - 1); // 1000 XP per tier
    const rankEl = document.getElementById('dashRank');
    rankEl.textContent = Object.values(state.progress).length === 0 ? 'Unranked' : ranks[rankIndex];
    rankEl.style.color = rankColors[rankIndex] || '#fff';

    // Announcements Logic
    const announcementText = localStorage.getItem('cq_announcement');
    const announcementBanner = document.getElementById('announcement-banner');
    if (announcementText && announcementBanner) {
        document.getElementById('announcement-text').textContent = announcementText;
        announcementBanner.classList.remove('hidden');
    }

    // Calculate XP Progress
    const xpBar = document.getElementById('dashXpBar');
    if (xpBar) {
        if (rankIndex >= ranks.length - 1) {
            xpBar.style.width = '100%';
        } else {
            const currentRankScore = rankIndex * 1000;
            const progressPercent = ((totalScore - currentRankScore) / 1000) * 100;
            xpBar.style.width = `${progressPercent}%`;
        }
    }

    // Render modes
    const modesGrid = document.getElementById('dashboardModesGrid');
    modesGrid.innerHTML = '';

    const modes = [
        { id: 'Beginner', icon: 'M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z', color: 'beginner', desc: 'Start your journey here' },
        { id: 'Intermediate', icon: 'M12 2l-5.5 9h11L12 2zM3 22h18v-8H3v8z', color: 'intermediate', desc: 'Sharpen your skills' },
        { id: 'Advanced', icon: 'M12 2L2 12h3v8h14v-8h3L12 2z', color: 'advanced', desc: 'Master the algorithms' },
        { id: 'Competitive Battles', icon: 'M18 1L6 13h5l-1 10 12-12h-5l1-10z', color: 'competitive', desc: 'Prove your worth' }
    ];

    modes.forEach(mode => {
        const progress = state.progress[mode.id] || 0;
        const totalLevels = questions[mode.id]?.length || 0;

        let isUnlocked = true;
        let lockReason = '';

        const req = modeConfig[mode.id].unlocksAt;
        if (req) {
            const reqProgress = state.progress[req.mode] || 0;
            if (reqProgress < req.level) {
                isUnlocked = false;
                lockReason = `Requires ${req.mode} Lvl ${req.level}`;
            }
        }

        const card = document.createElement('div');
        card.className = `game-card card-${mode.color} glass-panel`;
        if (!isUnlocked) card.classList.add('card-locked');

        card.onclick = () => {
            if (isUnlocked) openPath(mode.id);
            else alert('Complete previous levels to unlock');
        };

        let html = `
            <div class="card-glow"></div>
            ${!isUnlocked ? '<div class="lock-icon">🔒</div>' : ''}
            <div>
                <svg class="card-icon" style="width:50px; height:50px; fill:currentColor;" viewBox="0 0 24 24"><path d="${mode.icon}"/></svg>
                <div class="card-title">${mode.id}</div>
                <div class="card-desc">${mode.desc}</div>
            </div>
            <div class="card-rules">
                <div>Time: ${modeConfig[mode.id].time / 60} Min / Level</div>
                <div>Progress: ${progress}/${totalLevels} Levels</div>
                ${!isUnlocked ? `<div style="color:var(--neon-red); margin-top:5px;">Complete previous levels to unlock</div>` : ''}
            </div>
        `;
        card.innerHTML = html;
        modesGrid.appendChild(card);
    });
}

// Path Functions
function openPath(mode) {
    state.currentMode = mode;
    localStorage.setItem('cq_currentMode', mode);

    // Check if we need to redirect
    if (window.location.pathname.indexOf('game.html') === -1) {
        window.location.href = 'game.html';
        return;
    }

    document.getElementById('path-mode-title').textContent = mode;
    generatePathView(mode);

    document.getElementById('view-quiz').style.display = 'none';
    document.getElementById('view-path').style.display = 'block';
}

function generatePathView(mode) {
    const container = document.getElementById('path-container');
    container.innerHTML = '';

    const qs = questions[mode];
    if (!qs) return;

    const totalLevels = qs.length;
    let unlockedLevel = state.progress[mode] || 0;
    if (unlockedLevel > totalLevels) unlockedLevel = totalLevels;

    const svgHeight = 200 + (totalLevels * 150);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "svg-path");
    svg.setAttribute("viewBox", `0 0 600 ${svgHeight}`);
    svg.style.height = `${svgHeight}px`;

    let d = "M300,50 ";
    const points = [{ x: 300, y: 50 }];
    for (let i = 1; i <= totalLevels; i++) {
        let y = 50 + (i * 150);
        let x = 300 + (i % 2 === 1 ? 150 : -150);
        d += `S ${x},${y - 75} ${x},${y} `;
        points.push({ x, y });
    }

    const roadBg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    roadBg.setAttribute("class", "road-line");
    roadBg.setAttribute("d", d);
    svg.appendChild(roadBg);

    const roadProg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    roadProg.setAttribute("class", "road-progress");
    roadProg.setAttribute("d", d);
    roadProg.style.strokeDasharray = "2000";
    roadProg.style.strokeDashoffset = "2000";

    const progressRatio = totalLevels > 0 ? unlockedLevel / totalLevels : 0;
    setTimeout(() => {
        roadProg.style.strokeDashoffset = 2000 - (2000 * progressRatio);
    }, 100);

    svg.appendChild(roadProg);
    container.appendChild(svg);

    const houseSVG = `<svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.8l7.5 7.2h-2V20H6v-7z"/></svg>`;
    const lockSVG = `<svg viewBox="0 0 24 24" fill="#666"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>`;

    points.forEach((p, index) => {
        if (index === 0) return;
        const lvl = index;
        const milestone = document.createElement('div');
        milestone.className = 'milestone';
        milestone.style.left = `calc(50% - 300px + ${p.x}px)`;
        milestone.style.top = `${p.y + 50}px`;

        const label = document.createElement('div');
        label.className = 'level-label';
        label.innerText = `Level ${lvl}`;
        milestone.appendChild(label);

        const iconDiv = document.createElement('div');
        iconDiv.className = 'house-svg';

        if (lvl <= unlockedLevel + 1) {
            if (lvl === unlockedLevel + 1) {
                milestone.classList.add('active');
                iconDiv.classList.add('level-node-glow');
            } else {
                milestone.classList.add('completed');
            }
            iconDiv.innerHTML = houseSVG;
            milestone.onclick = () => startQuiz(lvl);
        } else {
            iconDiv.innerHTML = lockSVG;
            milestone.onclick = () => alert('Clear previous levels to unlock this node!');
        }

        milestone.appendChild(iconDiv);
        container.appendChild(milestone);

        if ((lvl === unlockedLevel + 1 && unlockedLevel < totalLevels) || (unlockedLevel === totalLevels && lvl === totalLevels)) {
            const avatarMarker = document.createElement('div');
            avatarMarker.className = 'player-avatar';
            avatarMarker.innerHTML = state.avatar; // Use string directly, could be emoji or image tag
            avatarMarker.style.fontSize = '30px';
            avatarMarker.style.textShadow = '0 0 10px var(--neon-blue)';

            const prevP = points[unlockedLevel === 0 ? 0 : unlockedLevel];
            avatarMarker.style.left = `calc(50% - 300px + ${prevP.x}px)`;
            avatarMarker.style.top = `${prevP.y + 10}px`;

            container.appendChild(avatarMarker);

            setTimeout(() => {
                const targetP = p;
                const activeP = unlockedLevel === totalLevels ? points[totalLevels] : targetP;
                avatarMarker.style.left = `calc(50% - 300px + ${activeP.x}px)`;
                avatarMarker.style.top = `${activeP.y}px`;

                container.scrollTo({ top: activeP.y - 150, behavior: 'smooth' });
            }, 500);
        }
    });
}

// Quiz Functions
function startQuiz(level) {
    if (level > (state.progress[state.currentMode] || 0) + 1) return;

    state.currentLevel = level;
    state.currentQuestionIndex = 0;

    document.getElementById('quiz-level-indicator').textContent = level;

    // Set timer based on mode rules
    state.totalTime = modeConfig[state.currentMode].time;
    state.timeLeft = state.totalTime;

    renderQuestion();

    updateTimerUI();
    clearInterval(state.timer);
    state.timer = setInterval(timerTick, 1000);

    document.getElementById('view-path').style.display = 'none';
    document.getElementById('view-quiz').style.display = 'flex';
}

function renderQuestion() {
    const qData = questions[state.currentMode][state.currentLevel - 1][state.currentQuestionIndex];

    // Inject quiz question
    const qTextHTML = `
        <div style="font-family: 'JetBrains Mono', monospace; background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px; border-left: 4px solid var(--neon-blue);">
            <div style="font-size: 18px; color: var(--primary); margin-bottom: 15px; font-weight: bold; text-transform: uppercase;">Question ${state.currentQuestionIndex + 1} / 10</div>
            ${qData.q}
        </div>
    `;
    document.getElementById('question-text').innerHTML = qTextHTML;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.innerHTML = `<span style="font-family: 'JetBrains Mono';">${opt}</span>`;
        btn.onclick = () => handleAnswer(idx, qData.answer, btn);
        grid.appendChild(btn);
    });
}

function timerTick() {
    state.timeLeft--;
    updateTimerUI();

    if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(b => b.style.pointerEvents = 'none');
        endQuiz(false, 'SYSTEM FAILURE: Time limit exceeded.');
    }
}

function updateTimerUI() {
    const progress = document.getElementById('timer-progress');
    const text = document.getElementById('timer-text');

    text.textContent = state.timeLeft;

    const ratio = state.timeLeft / state.totalTime;
    progress.style.strokeDashoffset = 283 - (283 * ratio);

    progress.classList.remove('timer-alert', 'timer-panic');
    text.classList.remove('timer-text-alert', 'timer-text-panic');
    text.style.color = '';

    if (state.timeLeft <= 5) {
        progress.classList.add('timer-panic');
        text.classList.add('timer-text-panic');
        playSound('fastTick');
    } else if (state.timeLeft <= 10) {
        progress.classList.add('timer-alert');
        text.classList.add('timer-text-alert');
        playSound('tick');
    }
}

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    clearInterval(state.timer);
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.style.pointerEvents = 'none');

    btnElement.classList.add('selected');

    setTimeout(() => {
        if (selectedIndex === correctIndex) {
            btnElement.classList.add('correct');
            setTimeout(() => {
                state.currentQuestionIndex++;
                if (state.currentQuestionIndex >= 10) {
                    endQuiz(true);
                } else {
                    renderQuestion();
                    // Resume timer without resetting it
                    state.timer = setInterval(timerTick, 1000);
                }
            }, 1000);
        } else {
            btnElement.classList.replace('selected', 'wrong');
            btns[correctIndex].classList.add('correct');
            setTimeout(() => endQuiz(false, 'Retry again'), 1500);
        }
    }, 500);
}

function calculateStars(timeTaken) {
    // Star allocation rules:
    // <= 30s -> 3 stars
    // <= 45s -> 2 stars
    // > 45s -> 1 star
    if (timeTaken <= 30) return 3;
    if (timeTaken <= 45) return 2;
    return 1;
}

function endQuiz(passed, msg = '') {
    const overlay = document.getElementById('overlay-result');
    const title = document.getElementById('result-title');
    const message = document.getElementById('result-message');
    const btnNext = document.getElementById('btn-next');
    const btnReplay = document.getElementById('btn-replay');
    const starsContainer = document.getElementById('result-stars');
    const timeText = document.getElementById('result-time');
    const levelNum = document.getElementById('result-level-num');
    const scoreVal = document.getElementById('result-score');
    const ribbon = document.getElementById('result-ribbon');

    starsContainer.innerHTML = ''; // reset stars
    if (levelNum) levelNum.textContent = state.currentLevel;

    const timeTaken = state.totalTime - state.timeLeft;
    let scoreEarned = 0;
    let starsEarned = 0;

    if (passed) {
        starsEarned = calculateStars(timeTaken);
        scoreEarned = 1000 + (timeTaken * 10);

        // Save level progress
        if (state.currentLevel > (state.progress[state.currentMode] || 0)) {
            state.progress[state.currentMode] = state.currentLevel;
            localStorage.setItem('cq_progress_' + (state.username || 'guest'), JSON.stringify(state.progress));

            // Add stars to total
            state.starsCount += starsEarned;
            localStorage.setItem('cq_stars_' + (state.username || 'guest'), state.starsCount);
        }
    } else {
        scoreEarned = 50; // Give minimal XP for participation
    }

    // Submit quiz result to DB on BOTH pass and fail
    if (localStorage.getItem('cq_user_id')) {
        fetch('submit_quiz.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: localStorage.getItem('cq_user_id'),
                score: scoreEarned,
                total_questions: 10,
                time_taken: timeTaken,
                xp_gained: scoreEarned,
                stars_earned: starsEarned
            })
        }).catch(err => console.error("Error saving score", err));
    }

    if (passed) {
        initDashboard(); // Update background dashboard stats

        playSound('success');

        title.textContent = 'SUCCESSFUL';
        title.style.color = 'white';
        title.style.textShadow = '0 0 10px white';
        ribbon.style.background = 'linear-gradient(90deg, #00ff88, #00cc66)';
        ribbon.style.boxShadow = '0 0 20px #00ff88';

        timeText.textContent = `Time: ${timeTaken}s`;
        message.textContent = `+${scoreEarned} XP | +${starsEarned} Star(s)`;
        
        if (scoreVal) scoreVal.textContent = scoreEarned;

        // Render 3 stars (gray out un-earned)
        for (let i = 1; i <= 3; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.textContent = '★';
            starsContainer.appendChild(s);

            // Animate filling earned stars
            if (i <= starsEarned) {
                setTimeout(() => {
                    s.classList.add('earned');
                }, i * 500);
            }
        }

        btnNext.style.display = 'block';
        btnNext.onclick = () => {
            overlay.classList.add('hidden');
            openPath(state.currentMode);
        };
        btnReplay.onclick = () => {
            overlay.classList.add('hidden');
            startQuiz(state.currentLevel);
        };
    } else {
        timeText.textContent = '';
        if (msg.includes('Time limit exceeded')) playSound('timeout');
        playSound('fail');
        
        title.textContent = 'FAILED';
        title.style.color = 'white';
        title.style.textShadow = '0 0 10px white';
        ribbon.style.background = 'linear-gradient(90deg, #ff3333, #cc0000)';
        ribbon.style.boxShadow = '0 0 20px #ff3333';

        message.textContent = msg;
        if (scoreVal) scoreVal.textContent = '0';

        // Render 3 gray stars
        for (let i = 1; i <= 3; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.textContent = '★';
            starsContainer.appendChild(s);
        }

        btnNext.style.display = 'none'; // hide next on fail
        btnReplay.onclick = () => {
            overlay.classList.add('hidden');
            startQuiz(state.currentLevel); // Re-start current level
        };
    }
    overlay.classList.remove('hidden');
}
