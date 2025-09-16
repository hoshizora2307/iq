// 問題データ
const quizData = [
    {
        question: "数列の？に入る数字は何でしょう？ 2, 4, 8, 16, ?",
        choices: ["24", "30", "32", "64"],
        correctAnswer: "32"
    },
    {
        question: "以下の展開図を組み立てると、どの立方体になりますか？",
        question_note: "（この問題は図が必要です。これはテキスト版の例です）",
        choices: ["A", "B", "C", "D"],
        correctAnswer: "B"
    },
    {
        question: "リンゴが5個、ミカンが3個あります。2個食べました。残りは何個？",
        choices: ["5個", "6個", "8個", "情報が不足"],
        correctAnswer: "情報が不足"
    },
    {
        question: "鏡に映すと「CIH」となる3文字の英単語は？",
        choices: ["BID", "ACE", "HOLE", "HIGH"],
        correctAnswer: "HIGH"
    },
    {
        question: "太郎君は昨日15歳でした。来年、彼は何歳になるでしょう？",
        choices: ["15歳", "16歳", "17歳", "18歳"],
        correctAnswer: "17歳"
    }
];

// HTML要素の取得
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultTextElement = document.getElementById('result-text');
const nextButton = document.getElementById('next-button');
const progressTextElement = document.getElementById('progressText');

let currentQuizIndex = 0;
let score = 0;

// クイズを読み込む関数
function loadQuiz() {
    // 前回の結果をリセット
    resultTextElement.textContent = '';
    nextButton.classList.add('hidden');
    choicesElement.innerHTML = '';

    if (currentQuizIndex < quizData.length) {
        progressTextElement.textContent = `問題 ${currentQuizIndex + 1} / ${quizData.length}`;
        const currentQuiz = quizData[currentQuizIndex];
        questionElement.textContent = currentQuiz.question;

        // 選択肢を作成
        currentQuiz.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-btn');
            button.addEventListener('click', () => selectAnswer(button, choice, currentQuiz.correctAnswer));
            choicesElement.appendChild(button);
        });
    } else {
        // クイズ終了
        showFinalResult();
    }
}

// 回答を選択したときの処理
function selectAnswer(button, selectedChoice, correctAnswer) {
    // すべてのボタンを無効化
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(btn => btn.disabled = true);

    if (selectedChoice === correctAnswer) {
        button.classList.add('correct');
        resultTextElement.textContent = '正解！';
        resultTextElement.className = 'correct';
        score++;
    } else {
        button.classList.add('incorrect');
        resultTextElement.textContent = `不正解... 正解は「${correctAnswer}」`;
        resultTextElement.className = 'incorrect';
        // 正解のボタンもハイライト
        choiceButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    nextButton.classList.remove('hidden');
}

// 最終結果を表示する関数
function showFinalResult() {
    questionElement.textContent = 'テスト終了';
    choicesElement.innerHTML = `<p class="final-score">${quizData.length}問中 ${score}問 正解しました！</p>`;
    progressTextElement.textContent = "お疲れ様でした";
    nextButton.textContent = 'もう一度挑戦';
    nextButton.classList.remove('hidden');
    // ボタンの役割を変更
    nextButton.onclick = () => {
        // リロードして最初から
        window.location.reload(); 
    };
}


// 次の問題へボタンのイベントリスナー
nextButton.addEventListener('click', () => {
    currentQuizIndex++;
    loadQuiz();
});

// 最初のクイズを読み込む
loadQuiz();
