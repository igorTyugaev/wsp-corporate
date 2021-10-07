import formService from './LendingService';

const Quiz = () => {
  const quizData = [
    {
      question: '1. В какие сроки Вам необходима публикация?',
      answers: [
        'До 6 месяцев',
        'От 6 до 12 месяцев',
        'Более 12 месяцев',
        'Еще не знаю',
      ],
    },
    {
      question: '2. Для каких целей Вам нужна публикация?',
      answers: [
        'Для защиты диссертации/ученой степени, получения учёного звания',
        'Для подачи заявки на стипендию и/или грант',
        'Для сдачи отчётности в вузе и/или продления контракта',
        'Для карьерного роста',
        'Для повышения личного рейтинга',
        'Для развития науки',
      ],
    },
    {
      question: '3. В какой области Вы специализируетесь?',
      answers: [
        'Социо-гуманитарные науки',
        'Науки о Земле',
        'Технические науки',
        'Медицина',
        'Биоинженерия',
        'Точные науки',
      ],
    },
    {
      question: '4. Готово ли Ваше научное исследование?',
      answers: ['Да', 'Нет', 'В работе', 'Другое'],
    },
    {
      question: '5. Какие показатели журнала Вам необходимы?',
      answers: [
        'Q1 / процентиль > 75 Scopus',
        'Q2 / процентиль > 50 Scopus',
        'Q3 / процентиль > 35  Scopus ',
        'Q3 / процентиль < 35 Scopus ',
        'Q4 / проценитль < 24 Scopus ',
        'WoS без импакт – фактора  / ESCI, AHCI',
        'WoS с импакт – фактором / SSCI, SCI',
        'Пропустить вопрос',
      ],
    },
  ];
  const initQuiz = (quiz) => {
    const currentQuestion = {
      count: 0,
      next: function () {
        if (this.count >= quizData.length) {
          this.count = (quizData.length);
        } else {
          this.count += 1;
        }
        return this.count;
      },

      back: function () {
        if (this.count <= 0) {
          this.count = 0;
        } else {
          this.count -= 1;
        }
        return this.count;
      },
    };
    const questionTitle = quiz.querySelector('.quiz-card__question');
    const quizForm = quiz.querySelector('.quiz-card__form');
    const answerFrame = quiz.querySelector('.quiz-card__body');
    const backwardBtn = quiz.querySelector('.quiz__backward');
    const progress = quiz.querySelector('.progress-bar__indicator');
    const score = quiz.querySelector('.quiz-progress__score');
    const answersQuiz = [];
    const addAnswer = (stepActive, answerActive) => {
      const answer = {
        question: quizData[stepActive].question,
        answer: answerActive,
      };
      answersQuiz.push(answer);
    };
    const renderAnswer = (text) => {
      const html = `<li class="quiz-card__answer"><button class="button button_fill button_quiz">${text}</button></li>`;
      answerFrame.insertAdjacentHTML('beforeend', html);
    };
    const setOption = (index) => {
      if (index < quizData.length) {
        const option = quizData[index];
        questionTitle.innerText = option.question;
        answerFrame.innerHTML = '';
        option.answers.forEach((answer) => renderAnswer(answer));
        if (quizForm.classList.contains('active')) quizForm.classList.remove('active');
      } else {
        questionTitle.innerHTML = 'Введите данные: <br> <span class="text">Письмо поступит на указанный эл.адрес в течение 15 минут.</span>';
        answerFrame.innerHTML = '';
        quizForm.classList.add('active');
      }
      progress.style.width = `${(index / quizData.length) * 100}%`;
      score.innerText = `${(index / quizData.length) * 100}%`;
    };

    const showSuccessSubmit = () => {
      questionTitle.classList.add('text_align_center');
      questionTitle.innerHTML = 'Спасибо, данные получены. <br> Ответ поступит на указанный e-mail.';
      quizForm.classList.remove('active');
    };

    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const elForm = e?.currentTarget;
      const data = formService.scrabbleInputs(elForm);
      if (!data) return;
      data.append('res', JSON.stringify(answersQuiz));
      backwardBtn.remove();
      elForm.classList.add('loading');
      formService.sendQuizForm(data)
        .then((res) => {
          console.log(res);
          showSuccessSubmit();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          elForm.classList.remove('loading');
        });
    });

    answerFrame.addEventListener('click', (event) => {
      const btnOption = event.target;
      const eventTagName = btnOption.tagName;
      if (eventTagName !== 'BUTTON') return;

      addAnswer(currentQuestion.count, btnOption.innerText);
      setOption(currentQuestion.next());
    });

    backwardBtn.addEventListener('click', () => setOption(currentQuestion.back()));

    setOption(currentQuestion.count);
  };

  const quizzes = document.querySelectorAll('.js-quiz');
  quizzes.forEach((quiz) => {
    initQuiz(quiz);
  });
};

export default Quiz;
