let questions = [
  {
    question: "Frage",
    answer_1: "Falsch",
    answer_2: "Falsch",
    answer_3: "Richtig",
    answer_4: "Falsch",
    right_answer: 3,
  },
  {
    question: "Klage",
    answer_1: "Richtig",
    answer_2: "Falsch",
    answer_3: "Falsch",
    answer_4: "Falsch",
    right_answer: 1,
  },
  {
    question: "Waage",
    answer_1: "Falsch",
    answer_2: "Falsch",
    answer_3: "Falsch",
    answer_4: "Richtig",
    right_answer: 4,
  },
];

let currentQuestion = 0;

let alreadyAnswered = false;

const SUCCESS_SOUND = new Audio("audio/right.mp3");
const FAIL_SOUND = new Audio("audio/false.mp3");

function init() {
  document.getElementById("max-questions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById("card-body").classList.add("d-none");
  } else {
    const question = questions[currentQuestion];
    const refQuestion = document.getElementById("current-question");
    refQuestion.innerHTML = question["question"];
    document.getElementById("current-question-id").innerHTML =
      currentQuestion + 1;

    for (let i = 1; i <= 4; i++) {
      const refAnswer = document.getElementById("answer_" + i);
      refAnswer.innerHTML = question["answer_" + i];
    }
  }
}

function answer(answer) {
  const question = questions[currentQuestion];
  const selectedQuestionNumber = answer.slice(-1);
  const IdRightAnswer = "answer_" + question["right_answer"];

  if (alreadyAnswered == false) {
    if (selectedQuestionNumber == question["right_answer"]) {
      document.getElementById(answer).parentElement.classList.add("bg-success");
      SUCCESS_SOUND.play();
    } else {
      document.getElementById(answer).parentElement.classList.add("bg-danger");
      document
        .getElementById(IdRightAnswer)
        .parentElement.classList.add("bg-success");
      FAIL_SOUND.play();
    }
    alreadyAnswered = true;
  }

  document.getElementById("button-next-question").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("button-next-question").disabled = true;
  progress();
  resetButtons();
  showQuestion();
  alreadyAnswered = false;
}

function resetButtons() {
  document
    .getElementById("answer_1")
    .parentElement.classList.remove("bg-danger");
  document
    .getElementById("answer_1")
    .parentElement.classList.remove("bg-success");
  document
    .getElementById("answer_2")
    .parentElement.classList.remove("bg-danger");
  document
    .getElementById("answer_2")
    .parentElement.classList.remove("bg-success");
  document
    .getElementById("answer_3")
    .parentElement.classList.remove("bg-danger");
  document
    .getElementById("answer_3")
    .parentElement.classList.remove("bg-success");
  document
    .getElementById("answer_4")
    .parentElement.classList.remove("bg-danger");
  document
    .getElementById("answer_4")
    .parentElement.classList.remove("bg-success");
}

function progress() {
  const progressId = document.getElementById("progress-bar");
  const progressContainerId = document.getElementById("progress-container");
  const restartId = document.getElementById("neustart");
  if (progressId.classList == "") {
    progressId.classList.add("progress-33");
  } else if (progressId.classList == "progress-33") {
    progressId.classList.add("progress-66");
  } else {
    progressContainerId.classList.add("d-none");
    restartId.classList.remove("d-none");
  }
}

function restart() {
  const restartId = document.getElementById("neustart");
  const progressContainerId = document.getElementById("progress-container");
  restartId.classList.add("d-none");
  currentQuestion = 0;
  showQuestion();
  progressContainerId.classList.remove("d-none");
  document.getElementById("card-body").classList.remove("d-none");
  document.getElementById("progress-bar").classList = "";
}
