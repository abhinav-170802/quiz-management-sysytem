// admin.js

let currentAdminTab = 'dashboard';

document.addEventListener('DOMContentLoaded', () => {
    // Check if admin is logged in
    if (!localStorage.getItem('cq_admin')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize Dashboard
    initAdminDashboard();

    // Enable real-time updates via polling
    setInterval(() => {
        if (currentAdminTab === 'users') fetchUsers();
        if (currentAdminTab === 'leaderboard') renderLeaderboard();
    }, 5000);
});

function logoutAdmin() {
    localStorage.removeItem('cq_admin');
    window.location.href = 'index.html';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

function switchTab(tabId) {
    currentAdminTab = tabId;
    // hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    // reset sidebar nav
    document.querySelectorAll('.sidebar-nav li').forEach(el => el.classList.remove('active'));
    
    // show target tab
    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Active class on clicked list item
    event.currentTarget.classList.add('active');
    
    // Update Title
    const titleText = event.currentTarget.textContent.replace(/[^\w\s]/gi, '').trim();
    document.getElementById('current-tab-title').textContent = titleText;

    // Call specific init functions based on tab
    if (tabId === 'questions') renderQuestionsBank();
    if (tabId === 'users') fetchUsers();
    if (tabId === 'leaderboard') renderLeaderboard();
}

function initAdminDashboard() {
    // Update Stats
    document.getElementById('stat-users').textContent = Math.floor(Math.random() * 500) + 120; // Dummy
    
    let qCount = 0;
    if (typeof questions !== 'undefined') {
        for(let mode in questions) {
            questions[mode].forEach(level => qCount += level.length);
        }
    }
    document.getElementById('stat-questions').textContent = qCount;

    // Render Charts
    const ctxUsers = document.getElementById('usersChart').getContext('2d');
    new Chart(ctxUsers, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Active Users',
                data: [65, 59, 80, 81, 56, 120, 150],
                borderColor: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }
    });

    const ctxPerf = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctxPerf, {
        type: 'bar',
        data: {
            labels: ['Beginner', 'Intermediate', 'Pro'],
            datasets: [{
                label: 'Avg Score',
                data: [850, 620, 410],
                backgroundColor: ['#00ff88', '#ffd700', '#ff3333']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }
    });
}

let currentQFilter = 'Beginner';

function setQFilter(mode) {
    currentQFilter = mode;
    document.querySelectorAll('.q-filter-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderQuestionsBank();
}

async function renderQuestionsBank() {
    const tbody = document.getElementById('questions-tbody');
    tbody.innerHTML = '';
    
    try {
        const res = await fetch('get_questions.php');
        const data = await res.json();
        
        if (data.success && data.questions) {
            window.questionsList = [];
            for (let m in data.questions) {
                data.questions[m].forEach(level => level.forEach(q => window.questionsList.push({...q, qMode: m})));
            }
            
            const mode = currentQFilter;
            if (data.questions[mode]) {
                data.questions[mode].forEach((level, lIdx) => {
                    level.forEach((q, qIdx) => {
                        const tr = document.createElement('tr');
                        const diffBadge = mode === 'Beginner' ? 'Easy' : mode === 'Intermediate' ? 'Medium' : 'Hard';
                        const safeQ = q.q.replace(/"/g, '&quot;');
                        tr.innerHTML = `
                            <td>Level ${lIdx + 1}</td>
                            <td style="max-width: 250px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" title="${safeQ}">${q.q}</td>
                            <td><span class="badge-tag">${diffBadge}</span></td>
                            <td><span class="badge-tag">${q.topic || 'General'}</span></td>
                            <td>
                                <button class="btn-neon" style="padding: 5px 10px; font-size: 12px; border-color: #00ff88; color: #00ff88;" onclick="viewQuestion(${q.id})">View</button>
                                <button class="btn-neon" style="padding: 5px 10px; font-size: 12px; border-color: #ffd700; color: #ffd700;" onclick="openEditQuestion(${q.id})">Edit</button>
                                <button class="btn-neon" style="padding: 5px 10px; font-size: 12px; border-color: #ff3333; color: #ff3333;" onclick="deleteQuestion(${q.id})">Del</button>
                            </td>
                        `;
                        tbody.appendChild(tr);
                    });
                });
            }
        }
    } catch(e) {
        console.error(e);
    }
}

function openAddQuestion() {
    document.getElementById('q-modal-title').textContent = 'Add New Question';
    document.getElementById('q-id').value = '';
    document.getElementById('q-text').value = '';
    document.getElementById('q-o1').value = '';
    document.getElementById('q-o2').value = '';
    document.getElementById('q-o3').value = '';
    document.getElementById('q-o4').value = '';
    document.getElementById('q-ans').value = '0';
    document.getElementById('addQuestionModal').classList.remove('hidden');
}

function openEditQuestion(id) {
    const q = window.questionsList.find(x => x.id == id);
    if(!q) return;
    document.getElementById('q-modal-title').textContent = 'Edit Question';
    document.getElementById('q-id').value = q.id;
    document.getElementById('q-text').value = q.q;
    document.getElementById('q-o1').value = q.options[0];
    document.getElementById('q-o2').value = q.options[1];
    document.getElementById('q-o3').value = q.options[2];
    document.getElementById('q-o4').value = q.options[3];
    document.getElementById('q-ans').value = q.answer;
    document.getElementById('addQuestionModal').classList.remove('hidden');
}

async function deleteQuestion(id) {
    if(!confirm("Are you sure you want to completely delete this question?")) return;
    try {
        const res = await fetch('delete_question.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        });
        const data = await res.json();
        if(data.success) {
            renderQuestionsBank();
        } else {
            alert('Delete Error: ' + data.message);
        }
    } catch(e) { console.error(e); }
}

function viewQuestion(id) {
    const q = window.questionsList.find(x => x.id == id);
    if(!q) return;
    document.getElementById('vq-text').textContent = q.q;
    const opts = document.getElementById('vq-options');
    opts.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.textContent = `Option ${idx + 1}: ${opt}`;
        if (idx === parseInt(q.answer)) li.style.color = 'var(--neon-green)';
        opts.appendChild(li);
    });
    document.getElementById('vq-correct').textContent = 'Option ' + (parseInt(q.answer) + 1);
    document.getElementById('viewQuestionModal').classList.remove('hidden');
}

async function saveQuestion() {
    const id = document.getElementById('q-id').value;
    const payload = {
        id: id,
        question: document.getElementById('q-text').value,
        option1: document.getElementById('q-o1').value,
        option2: document.getElementById('q-o2').value,
        option3: document.getElementById('q-o3').value,
        option4: document.getElementById('q-o4').value,
        correct_option: document.getElementById('q-ans').value,
        difficulty: document.getElementById('q-diff').value,
        topic: document.getElementById('q-tags').value
    };
    
    const endpoint = id ? 'edit_question.php' : 'add_question.php';
    
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if(data.success) {
            alert(id ? "Question updated successfully!" : "Question added successfully!");
            document.getElementById('addQuestionModal').classList.add('hidden');
            renderQuestionsBank();
        } else {
            alert("Error: " + data.message);
        }
    } catch(e) { console.error(e); alert("Failed communicating with database."); }
}

async function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const text = e.target.result;
        // Basic parser handling quotes conditionally on standard configurations
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        const parsedQuestions = [];
        for (let i = 1; i < lines.length; i++) { // Skip header row explicitly
            const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols.length >= 6) {
                parsedQuestions.push({
                    question: cols[0],
                    option1: cols[1],
                    option2: cols[2],
                    option3: cols[3],
                    option4: cols[4] || 'N/A',
                    correct_option: parseInt(cols[5]) || 0,
                    difficulty: cols[6] ? cols[6].toLowerCase() : 'easy',
                    topic: cols[7] || 'General' // Auto tag grouping mechanism mapped fallback defaults gracefully 
                });
            }
        }

        if (parsedQuestions.length === 0) {
            alert("No valid structural rows matched. Valid Header mapping: Question, Option1, Option2, Option3, Option4, CorrectIndex, Difficulty, Topic");
            return;
        }

        if(!confirm(`Attempting to upload ${parsedQuestions.length} database entities recursively. Proceed with bulk deployment processing?`)) return;

        try {
            const res = await fetch('bulk_upload.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({questions: parsedQuestions})
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                renderQuestionsBank();
            } else {
                alert("Upload Sequence Error: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Upload stream dropped. Check connection strings or JSON formatting payloads specifically.");
        }
    };
    reader.readAsText(file);
    event.target.value = ''; 
}

let dbUsers = [];

async function fetchUsers() {
    try {
        const res = await fetch('get_users.php');
        const data = await res.json();
        if (data.success) {
            dbUsers = data.users;
            const searchBox = document.getElementById('user-search');
            renderUsers(searchBox ? searchBox.value : '');
        }
    } catch (e) {
        console.error("Failed fetching users");
    }
}

function renderUsers(filter = '') {
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = '';
    
    dbUsers.forEach(u => {
        if (u.name.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase())) {
            const tr = document.createElement('tr');
            const statusColor = u.status === 'active' ? '#00ff88' : '#ff3333';
            tr.innerHTML = `
                <td>${u.name}</td>
                <td style="font-family: 'JetBrains Mono';">${u.xp}</td>
                <td style="font-family: 'JetBrains Mono';">${u.attempts || 0}</td>
                <td><span style="color: ${statusColor};">${u.status}</span></td>
                <td>
                    <button class="btn-neon" style="padding: 5px 10px; font-size: 12px; border-color: ${statusColor}; color: ${statusColor};" onclick="toggleBan('${u.id}')">${u.status === 'active' ? 'Ban' : 'Unban'}</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function filterUsers() {
    const search = document.getElementById('user-search').value;
    renderUsers(search);
}

function toggleBan(id) {
    const u = dbUsers.find(x => x.id == id);
    if(u) {
        u.status = u.status === 'active' ? 'banned' : 'active';
        filterUsers();
    }
}

async function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    tbody.innerHTML = '';
    
    try {
        const res = await fetch('get_leaderboard.php');
        const data = await res.json();
        
        if (data.success) {
            data.leaderboard.forEach((u, i) => {
                const flagColor = u.status === 'banned' ? '#ff3333' : '#444';
                const flagText = u.status === 'banned' ? 'Flagged' : 'Clean';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#${i+1}</td>
                    <td>${u.name}</td>
                    <td style="font-family: 'JetBrains Mono'; color: #ffd700;">${u.xp}</td>
                    <td style="font-family: 'JetBrains Mono';">${u.attempts || 0}</td>
                    <td><span class="badge-tag" style="background: ${flagColor}; border-color: ${flagColor};">${flagText}</span></td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (e) {
        console.error("Failed fetching leaderboard");
    }
}

function resetLeaderboard() {
    if(confirm("Are you sure you want to reset the leaderboard for this week?")) {
        dummyUsers.forEach(u => u.xp = 0);
        renderLeaderboard();
        alert("Leaderboard reset successfully.");
    }
}

function createContest() {
    const title = document.getElementById('contest-title').value;
    if(title.trim() === '') return alert('Enter a contest title');
    localStorage.setItem('cq_contest', title);
    document.getElementById('contest-msg').style.display = 'block';
    setTimeout(() => document.getElementById('contest-msg').style.display = 'none', 3000);
}

function broadcastAnnouncement() {
    const text = document.getElementById('announcement-input').value;
    if (text.trim() === '') return alert('Enter a message');
    localStorage.setItem('cq_announcement', text);
    document.getElementById('announce-msg').style.display = 'block';
    setTimeout(() => document.getElementById('announce-msg').style.display = 'none', 3000);
}
