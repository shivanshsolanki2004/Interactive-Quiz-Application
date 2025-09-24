document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackElement = document.getElementById('feedback');
    const progressBarElement = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const timeElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const wrongAnswersElement = document.getElementById('wrong-answers');
    const timeTakenElement = document.getElementById('time-taken');
    const finalScoreElement = document.getElementById('final-score');
    const performanceTitle = document.getElementById('performance-title');
    const performanceMessage = document.getElementById('performance-message');
    const previewCertificateBtn = document.getElementById('preview-certificate');
    const retryBtn = document.getElementById('retry-btn');
    const newQuizBtn = document.getElementById('new-quiz-btn');
    const certificateModal = document.getElementById('certificate-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const downloadCertificateBtn = document.getElementById('download-certificate');
    const certificateName = document.getElementById('certificate-name');
    const certificateScore = document.getElementById('certificate-score');
    const certificateDate = document.getElementById('certificate-date');

    // Quiz Variables
    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    let timerInterval;
    let seconds = 0;
    let quizStarted = false;

    // Sample Questions Database
    const questionBank = [
        {
            id: 1,
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Text Makeup Language"
            ],
            answer: 0,
            category: "html",
            difficulty: "easy",
            explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
        },
        {
            id: 2,
            question: "Which of the following is NOT a JavaScript data type?",
            options: [
                "String",
                "Boolean",
                "Number",
                "Float"
            ],
            answer: 3,
            category: "javascript",
            difficulty: "easy",
            explanation: "JavaScript has several data types including String, Boolean, and Number, but Float is not a separate data type - it's part of the Number type."
        },
        {
            id: 3,
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            answer: 2,
            category: "css",
            difficulty: "easy",
            explanation: "CSS stands for Cascading Style Sheets, which is used to style HTML elements."
        },
        {
            id: 4,
            question: "Which method is used to add an element to the end of an array in JavaScript?",
            options: [
                "push()",
                "pop()",
                "shift()",
                "unshift()"
            ],
            answer: 0,
            category: "javascript",
            difficulty: "medium",
            explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
        },
        {
            id: 5,
            question: "What is the correct way to write a JavaScript array?",
            options: [
                'var colors = ["red", "green", "blue"]',
                'var colors = (1:"red", 2:"green", 3:"blue")',
                'var colors = "red", "green", "blue"',
                'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
            ],
            answer: 0,
            category: "javascript",
            difficulty: "easy",
            explanation: "JavaScript arrays are written with square brackets and array items are separated by commas."
        },
        {
            id: 6,
            question: "Which HTML attribute is used to define inline styles?",
            options: [
                "class",
                "font",
                "styles",
                "style"
            ],
            answer: 3,
            category: "html",
            difficulty: "easy",
            explanation: "The style attribute is used to add inline styles to an HTML element."
        },
        {
            id: 7,
            question: "How do you write an IF statement in JavaScript?",
            options: [
                "if i == 5 then",
                "if (i == 5)",
                "if i = 5",
                "if i = 5 then"
            ],
            answer: 1,
            category: "javascript",
            difficulty: "easy",
            explanation: "In JavaScript, the if statement is written with parentheses around the condition."
        },
        {
            id: 8,
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "text-color",
                "font-color",
                "color",
                "text-style"
            ],
            answer: 2,
            category: "css",
            difficulty: "easy",
            explanation: "The 'color' property in CSS is used to set the color of the text."
        },
        {
            id: 9,
            question: "What is the correct way to write a JavaScript for loop?",
            options: [
                "for (i = 0; i <= 5; i++)",
                "for (i <= 5; i++)",
                "for i = 1 to 5",
                "for (i = 0; i <= 5)"
            ],
            answer: 0,
            category: "javascript",
            difficulty: "medium",
            explanation: "The correct syntax for a JavaScript for loop is: for (initialization; condition; increment)."
        },
        {
            id: 10,
            question: "Which operator is used to assign a value to a variable in JavaScript?",
            options: [
                "=",
                "==",
                "===",
                "*"
            ],
            answer: 0,
            category: "javascript",
            difficulty: "easy",
            explanation: "The '=' operator is used to assign values to variables in JavaScript."
        },
        {
            id: 11,
            question: "What is the purpose of the 'this' keyword in JavaScript?",
            options: [
                "It refers to the current function",
                "It refers to the previous object",
                "It refers to the current object",
                "It refers to the parent object"
            ],
            answer: 2,
            category: "javascript",
            difficulty: "hard",
            explanation: "In JavaScript, 'this' refers to the object it belongs to. It has different values depending on where it is used."
        },
        {
            id: 12,
            question: "Which method converts JSON data to a JavaScript object?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.convert()",
                "JSON.toObject()"
            ],
            answer: 0,
            category: "javascript",
            difficulty: "medium",
            explanation: "JSON.parse() parses a JSON string, constructing the JavaScript value or object described by the string."
        },
        {
            id: 13,
            question: "What does the 'DOM' stand for in web development?",
            options: [
                "Data Object Model",
                "Document Object Model",
                "Display Object Management",
                "Digital Output Model"
            ],
            answer: 1,
            category: "web",
            difficulty: "medium",
            explanation: "DOM stands for Document Object Model, which is a programming interface for web documents."
        },
        {
            id: 14,
            question: "Which HTML5 element is used to draw graphics on a web page?",
            options: [
                "<graphic>",
                "<canvas>",
                "<draw>",
                "<svg>"
            ],
            answer: 1,
            category: "html",
            difficulty: "medium",
            explanation: "The <canvas> element is used to draw graphics, on the fly, via scripting (usually JavaScript)."
        },
        {
            id: 15,
            question: "What is the purpose of media queries in CSS?",
            options: [
                "To apply different styles based on device characteristics",
                "To query a media database",
                "To embed media files in a webpage",
                "To style media player controls"
            ],
            answer: 0,
            category: "css",
            difficulty: "hard",
            explanation: "Media queries allow you to apply CSS styles depending on a device's general type or specific characteristics."
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        const selectedCategory = categorySelect.value;
        const selectedDifficulty = difficultySelect.value;
        
        questions = questionBank.filter(q => {
            const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
            const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
            return categoryMatch && difficultyMatch;
        });

        questions = shuffleArray(questions).slice(0, 10);
        userAnswers = new Array(questions.length).fill(null);
        
        currentQuestionIndex = 0;
        score = 0;
        seconds = 0;
        quizStarted = false;
        
        scoreElement.textContent = score;
        timeElement.textContent = '00:00';
        
        showScreen('welcome-screen');
    }

    // Start the quiz
    function startQuiz() {
        if (questions.length === 0) {
            alert('No questions available with the selected filters. Please try different options.');
            return;
        }
        
        quizStarted = true;
        startTimer();
        showScreen('quiz-screen');
        displayQuestion();
    }

    // Display current question
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            
            if (userAnswers[currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });
        
        updateProgress();
        updateNavigationButtons();
        
        feedbackElement.style.display = 'none';
        feedbackElement.className = 'feedback';
    }

    // Select an answer
    function selectAnswer(selectedIndex) {
        userAnswers[currentQuestionIndex] = selectedIndex;
        
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === selectedIndex) {
                option.classList.add('selected');
            }
        });
        
        const question = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.answer;
        
        showFeedback(isCorrect, question.explanation);
        
        options.forEach((option, index) => {
            // Disable further clicks after an answer is chosen for this question
            option.disabled = true; 
            if (index === question.answer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('wrong');
            }
        });
    }

    // Show feedback for answer
    function showFeedback(isCorrect, explanation) {
        feedbackElement.textContent = isCorrect 
            ? `✓ Correct! ${explanation}`
            : `✗ Incorrect. The correct answer is explained: ${explanation}`;
            
        feedbackElement.className = isCorrect ? 'feedback correct' : 'feedback wrong';
        feedbackElement.style.display = 'block';
    }

    // Update progress bar and text
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarElement.style.setProperty('--progress', `${progress}%`);
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    // Update navigation buttons state
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    // Navigate to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    // Navigate to next question
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    // Submit the quiz
    function submitQuiz() {
        stopTimer();
        calculateResults();
        showScreen('results-screen');
    }

    // Calculate final results
    function calculateResults() {
        let correctCount = 0;
        let wrongCount = 0;

        questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                correctCount++;
            } else if (userAnswers[index] !== null) {
                wrongCount++;
            }
        });

        score = correctCount * 10;
        const percentageScore = Math.round((correctCount / questions.length) * 100);

        correctAnswersElement.textContent = correctCount;
        wrongAnswersElement.textContent = wrongCount;
        finalScoreElement.textContent = `${percentageScore}%`;
        timeTakenElement.textContent = formatTime(seconds);
        scoreElement.textContent = score;

        const performance = getPerformanceMessage(percentageScore);
        performanceTitle.textContent = performance.title;
        performanceMessage.textContent = performance.message;
    }

    // Get performance message based on score
    function getPerformanceMessage(percentageScore) {
        if (percentageScore >= 80) {
            return {
                title: "Excellent!",
                message: "You have demonstrated outstanding knowledge in this quiz. Keep up the great work!",
            };
        } else if (percentageScore >= 60) {
            return {
                title: "Good Job!",
                message: "You have a good understanding of the topics, but there's room for improvement.",
            };
        } else if (percentageScore >= 40) {
            return {
                title: "Not Bad!",
                message: "You have some knowledge of the topics, but you might want to review some areas.",
            };
        } else {
            return {
                title: "Keep Learning!",
                message: "Don't worry! Use this as a learning opportunity to improve your knowledge.",
            };
        }
    }

    // Show certificate preview
    function showCertificate() {
        const percentageScore = finalScoreElement.textContent;
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        certificateName.textContent = "CodTech Intern";
        certificateScore.textContent = percentageScore;
        certificateDate.textContent = formattedDate;
        certificateModal.style.display = 'block';
    }

    // Download certificate (simulated)
    function downloadCertificate() {
        alert("In a real application, this would download your certificate as a PDF.");
    }

    // Timer functions
    function startTimer() {
        if(timerInterval) clearInterval(timerInterval); // Clear any existing timer
        seconds = 0;
        timeElement.textContent = formatTime(seconds);
        timerInterval = setInterval(() => {
            seconds++;
            timeElement.textContent = formatTime(seconds);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Helper function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Show specific screen
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    previewCertificateBtn.addEventListener('click', showCertificate);
    
    retryBtn.addEventListener('click', () => {
        // Re-initialize with the same settings
        const currentCategory = categorySelect.value;
        const currentDifficulty = difficultySelect.value;
        initQuiz(); // Resets filters to default, so we set them again
        categorySelect.value = currentCategory;
        difficultySelect.value = currentDifficulty;
        startQuiz();
    });

    newQuizBtn.addEventListener('click', () => {
        initQuiz();
        showScreen('welcome-screen');
    });
    
    closeModalBtn.addEventListener('click', () => {
        certificateModal.style.display = 'none';
    });
    
    downloadCertificateBtn.addEventListener('click', downloadCertificate);
    
    window.addEventListener('click', (event) => {
        if (event.target === certificateModal) {
            certificateModal.style.display = 'none';
        }
    });

    // Initialize the quiz when page loads
    initQuiz();
});