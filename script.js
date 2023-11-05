// 문제 리스트
const questions = [
    { question: "What is 2 + 2?" },
    { question: "What is the capital of France?" },
    { question: "What is 5 x 5?" }
];

// 문제를 불러오는 함수
function loadQuestion(index) {
    const container = document.getElementById('question-container');
    const question = questions[index];

    if (!question) {
        container.innerHTML = "<h1>Congratulations! You've completed all the questions.</h1>";
        return;
    }

    container.innerHTML = `
        <h1>${question.question}</h1>
        <input type="text" id="user-answer" placeholder="Your answer" />
        <button onclick="checkAnswer(${index})">Submit</button>
    `;
}

// 정답을 확인하는 함수
async function checkAnswer(index) {
    const userAnswer = document.getElementById('user-answer').value;
    const response = await fetch('/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, userAnswer })
    });
    const result = await response.json();
    if (result.correct) {
        alert("Correct! Moving to the next question.");
        document.cookie = `currentQuestion=${index + 1}; path=/`;
        loadQuestion(index + 1);
    } else {
        alert("Incorrect! Try again.");
    }
}

// 페이지 로드 시 현재 문제 불러오기
function getCurrentQuestion() {
    const cookies = document.cookie.split('; ');
    const currentQuestionCookie = cookies.find(cookie => cookie.startsWith('currentQuestion='));
    return currentQuestionCookie ? parseInt(currentQuestionCookie.split('=')[1]) : 0;
}

loadQuestion(getCurrentQuestion());
