document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.expand();

    let currentPuzzle = generatePuzzle();
    let score = 0;

    function generatePuzzle() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        const puzzle = `${num1} ${operator} ${num2}`;
        document.getElementById('puzzle').textContent = puzzle;
        return {puzzle, answer: eval(puzzle)};
    }

    document.getElementById('submitButton').addEventListener('click', function() {
        const userAnswer = parseInt(document.getElementById('answer').value);
        const resultElement = document.getElementById('result');

        if (userAnswer === currentPuzzle.answer) {
            score++;
            resultElement.textContent = 'Correct! Score: ' + score;
            currentPuzzle = generatePuzzle();
        } else {
            resultElement.textContent = 'Wrong. Try again!';
        }

        document.getElementById('answer').value = '';
    });

    tg.MainButton.setText('FINISH GAME').show().onClick(function() {
        tg.showAlert('Your final score: ' + score);
        tg.close();
    });
});