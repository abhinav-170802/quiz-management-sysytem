const fs = require('fs');

let content = fs.readFileSync('questions.js', 'utf-8');
content = content.replace('const questions = ', '').replace(/;\s*$/, '');

// Use new Function to safely evaluate the JS object into a real object
const getObj = new Function('return ' + content);
const questions = getObj();

async function seed() {
    let count = 0;
    for (const mode in questions) {
        let diff = 'easy';
        if (mode === 'Intermediate') diff = 'medium';
        if (mode === 'Advanced') diff = 'hard';
        if (mode === 'Competitive Battles') diff = 'hard';
        
        const levels = questions[mode];
        for (let l = 0; l < levels.length; l++) {
            const levelQuestions = levels[l];
            for (let q = 0; q < levelQuestions.length; q++) {
                const item = levelQuestions[q];
                
                const payload = {
                    question: item.q,
                    option1: item.options[0],
                    option2: item.options[1],
                    option3: item.options[2],
                    option4: item.options[3],
                    correct_option: item.answer,
                    difficulty: diff,
                    topic: mode
                };
                
                try {
                    const res = await fetch('http://localhost/quiz%20manegement/add_question.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(payload)
                    });
                    const text = await res.text();
                    // console.log(text);
                    count++;
                } catch(e) {
                    console.error('Failed to seed a question:', e);
                }
            }
        }
    }
    console.log(`Successfully seeded ${count} questions into the Database!`);
}

seed();
