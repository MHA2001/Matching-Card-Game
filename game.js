let choose = [];
let score = 0;

function playGame() {
  cardRandomize();
  turnBackCard(document.querySelectorAll(".card"), 3000);
  document.querySelectorAll(".card").forEach((element) => {
    element.addEventListener("click", flipCard);
  });
}

function cardRandomize() {

  let cards = document.querySelectorAll(".card img:first-child");
  let usedCard = [];
  cards.forEach(function (element) {
    flag = true;
    let randNumber;
    while (flag) {
      randNumber = Math.floor(Math.random() * 12) + 1;
      flag = counter(usedCard, randNumber);
    }
    usedCard.push(randNumber);
    element.setAttribute("src", `./cards/card (${randNumber}).png`);
  });
}

function counter(array, x) {
  let c = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === x) c++;
  }
  return c === 2;
}

function turnBackCard(domArray, x) {
  setTimeout(() => {
    domArray.forEach(function (dom) {
      dom.querySelector("img:first-child").classList.add("front-of-card-of");
    });

    domArray.forEach(function (dom) {
      dom.querySelector("img:last-child").classList.add("back-of-card-on");
    });
  }, x);
}

function flipCard() { 
  if (choose.length != 2) {
    this.querySelector("img:first-child").classList.remove("front-of-card-of");
    this.querySelector("img:last-child").classList.remove("back-of-card-on");

    choose.push(this);

    if (choose.length === 2) {
      if (isMatch(choose)) {
        choose.length = 0;
      } else {
        turnBackCard(choose, 800);
        setTimeout(() => {
          choose.length = 0;
        }, 800);
      }
    }
  }
}

function isMatch(array) {
  let img2 = array[1].querySelector("img:first-child");
  let img1 = array[0].querySelector("img:first-child");

  let flag = img2.getAttribute("src") == img1.getAttribute("src");
  if (flag) {
    array[0].removeEventListener("click", flipCard);
    array[1].removeEventListener("click", flipCard);
    score++;
    document.getElementById("score").textContent = score;
  }
  return flag;
}



playGame();
