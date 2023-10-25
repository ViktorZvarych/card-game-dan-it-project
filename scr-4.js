'use strict';

// ! Variables

const allCards = document.querySelectorAll('.memory-card');
// * Змінна, яка зберігає всі об'єкти карток. Знаходимо на сторінці всі елементи з класами ".memory-card" і записуємо в змінну.

const CARDS_COUNT = allCards.length; // карток поки 12
// * Змінна, яка зберігає кількість карток на дошці. Ініціалізувати із значенням кількості карток в DOM.

const FLIP_CARD_DELAY = 1000;
// * Змінна, яка зберігає час затримки перед перевертанням картки. Ініціалізуємо зі значенням 1000.

let hasFlippedCard = false;
// * Змінна, значення якої визначає чи маємо перевернуту картку. Ініціалізуємо зі значенням false.

let firstCard, secondCard;
// * Змінні, значення яких зберігатимуть першу та другу перевернуту картку. Тільки оголошуємо, без ініціалізації.



const initialScore = 100;
//Початковий рахунок

let score = initialScore;
// Поточний ахунок

const scoreSpan = document.getElementById('score');
// Елемент, який показує рахунок

scoreSpan.innerHTML = score;
// Висвітлюємо рахунок

const resetButton = document.getElementById('reset-button');
// Створюємо змінну з кнопкою для перезапуску гри

resetButton.addEventListener('click', () => {
  // Встановлюємо на кнопку лісенер кліку

  allCards.forEach((card) => card.classList.remove('flip'));
  // Видаляємо у всіх карток клас 'flip'

  initializeBoard(allCards);
  // Знову ініціалізуємо дошку, яка розставить картки на інші місця та додасть лісенери кліку на кожну картку

  resetScore();
  //Скидаємо рахунок до початкового
});

// ! Functions

// * Функція, яка скидає значення змінних дошки.
function resetBoard() {
  hasFlippedCard = false;
  //Змінній, значення якої визначає, чи маємо на дошці перевернуту картку, ставимо вихідне значення.

  firstCard = null;
  secondCard = null;
  // Змінним значення яких зберігають першу і другу перевернуту карту присвоюємо порожнє значення.
}

// * Функція для скидання значення рахунку до початкового значення
function resetScore() {
  scoreSpan.innerHTML = 100;
  score = +scoreSpan.innerHTML;
}

// * Функція, яка через певний час перевертає картки у вихідний стан.
function unflipCards() {
  setTimeout(function () {
    // Функція повинна через FLIP_CARD_DELAY виконати такі дії:
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    // * - змінним, які зберігають першу і другу натиснуту картку, через властивість classList, прибрати клас "flip" (виводи в консоль видаляємо)

    resetBoard();
    // * - викликати функцію скидання змінних дошки
  }, FLIP_CARD_DELAY);
}

// * Функція, яка визначає чи збігаються перевернуті картки.

function actionIfMatch(firstCardFramework, secondCardframework) {
  //Функція як параметри приймає назву фреймворку першої картки та назву фреймворку другої картки.

  if (firstCardFramework === secondCardframework) {
    // При збігу назв фреймворків карток виконується блокування карт, при розбіжності - їх переворот у вихідний стан.

    disableCards();
    // * виклик функції блокування карт

    score += 10;
    // Додаємо бали
    scoreSpan.innerHTML = score;
  } else {
    unflipCards();
    // * Інакше: виклик функції по перевороту карток у вихідний стан.

    score -= 15;
    // Забираємо бали
    scoreSpan.innerHTML = score;

    if (score < 0) {
      alert(`
      You lost!
      It's not Your  day!
      `);

      score = 0;
      scoreSpan.innerHTML = score;

      const flippedCards = document.querySelectorAll('.flip');

      setTimeout(() => {
        if (confirm('Restart game?') == true) {
          flippedCards.forEach((card) => {
            card.classList.remove('flip');
            // Видаляємо у всіх карток клас 'flip'
            initializeBoard(allCards);
            // Знову ініціалізуємо дошку, яка розставить картки на інші місця та додасть лісенери кліку на кожну картку
            resetScore();
            //Скидаємо рахунок
          });
        }
      }, 1000);
    }
  }
}

// * Функція, яка буде обробником при натисканні на картку.
function onClickCardHandler(event) {
  // * Як параметр функція приймає об'єкт події

  if (firstCard && secondCard) {
    // * Якщо значення в змінних, що зберігають першу та другу картку не пусті

    return;
    // * - зупиняємо роботу функції.
  } else if (this === firstCard) {
    // * Якщо картка, на яку натиснули і значення записане в змінній, яка призначена для зберігання першої перевернутої картки збігаються

    return;
    // * - зупиняємо роботу функції.
  }

  this.classList.add('flip');
  // * Додаємо картці клас "flip"

  if (!hasFlippedCard) {
    // * Перевіряємо, якщо на дошці ще немає перевернутих карток, то:

    hasFlippedCard = true;
    // * - змінюємо значення змінної, яка визначає чи маємо ми перевернуту картку на true

    firstCard = this;
    // * - записуємо в змінну, яка призначена для зберігання першої перевернутої картки - картку на яку натиснули та зупиняємо роботу функції
    return;
  } else {
    secondCard = this;
    // * Інакше записуємо картку на яку натиснули в змінну, яка призначена для зберігання другої перевернутої картки
  }

  actionIfMatch(firstCard.dataset.framework, secondCard.dataset.framework);
  // * Викликаємо функцію, яка визначає чи збігаються перевернуті картки і передаємо їй як аргументи значення фреймворку першої і другої картки. Підказку як отримати назву фреймворку може дати розмітка карток (Їх HTML код).

  setTimeout(checkBoard, 1000);
  // * Викликаємо функцію для перевірки дошки та перезавантаження гри
}

// * Функція, що ініціалізує дошку.
function initializeBoard(cards) {
  // Функція приймає як параметри масив карток.
  cards.forEach((card) => {
    // Перебирає отриманий масив і при кожній ітерації (колі перебору):
    const randomPosition = Math.floor(Math.random() * CARDS_COUNT);
    card.style.order = randomPosition;
    // привласнюємо їм випадкові значення, розраховані раніше, в css властивість `order`,
    card.addEventListener('click', onClickCardHandler);
    // вішаємо обробник події кліку на кожну картку.
  });
}

// * Функція для перевірки дошки та перезавантаження гри, у випадку перемоги (коли усі картки на дошці перевернуті, тобто мають клас 'flip')
function checkBoard() {
  const flippedCards = document.querySelectorAll('.flip');

  if (flippedCards.length === CARDS_COUNT) {
    alert(`
    You won!
    Your score is: ${score}
    Congratulations!!!
    `);

    setTimeout(() => {
      if (confirm('Restart game?') == true) {
        flippedCards.forEach((card) => {
          card.classList.remove('flip');
          // Видаляємо у всіх карток клас 'flip'
          initializeBoard(allCards);
          // Знову ініціалізуємо дошку, яка розставить картки на інші місця та додасть лісенери кліку на кожну картку
          resetScore();
          //Скидаємо рахунок
        });
      }
    }, 1000);
  }
}

// * Функція блокування першої та другої картки.
function disableCards() {
  // Функція має виконати такі дії:

  firstCard.removeEventListener('click', onClickCardHandler);
  secondCard.removeEventListener('click', onClickCardHandler);
  // * - Видаляє обробники кліка на першу та другу картки

  resetBoard();
  // * - Викликає функцію скидання змінних дошки.
}

// * Викликаємо функцію ініціалізації дошки, передаємо їй як аргумент змінну, яка зберігає всі об'єкти карток
initializeBoard(allCards);
