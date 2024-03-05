//Pour le jeu , nous avons besoin de 8 images ( jeu de 16 cartes )
const cards = [
  "https://picsum.photos/id/237/100/100",
  "https://picsum.photos/id/238/100/100",
  "https://picsum.photos/id/239/100/100",
  "https://picsum.photos/id/240/100/100",
  "https://picsum.photos/id/241/100/100",
  "https://picsum.photos/id/242/100/100",
  "https://picsum.photos/id/243/100/100",
  "https://picsum.photos/id/244/100/100",
];

const gameBoard = document.getElementById("game-board");

let selectedCards = [];

// fonction qui créer les cards de façon dynamique
function createCard(CardUrl) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = CardUrl;

  const cardContent = document.createElement("img");
  cardContent.classList.add("card-content");
  cardContent.src = `${CardUrl}`;

  card.appendChild(cardContent);

  card.addEventListener("click", onCardClick);
  return card;
}

//Code pour tester notre fonction
// const gameBoard = document.getElementById("game-board");
// gameBoard.appendChild(createCard("https://picsum.photos/id/243/100/100"));

//On duplique notre tableau
function duplicateArray(arraySimple) {
  let arrayDouble = [];
  arrayDouble.push(...arraySimple);
  arrayDouble.push(...arraySimple);
  return arrayDouble;
}

//Début de listing Informatique : JS
//la méthode mélange de façon aléatoire les url
function shuffleArray(arrayToshuffle) {
  const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
  return arrayShuffled;
}

//ajout d'une classe 'flip' lorsqu'on clic sur une carte
function onCardClick(e) {
  const card = e.target.parentElement;
  card.classList.add("flip");

  selectedCards.push(card);
  if (selectedCards.length == 2) {
    setTimeout(() => {
      if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
        selectedCards[0].classList.add("matched");
        selectedCards[1].classList.add("matched");
        selectedCards[0].removeEventListener("click", onCardClick);
        selectedCards[1].removeEventListener("click", onCardClick);
        const allCardNotFinded = document.querySelectorAll(
          ".card:not(.matched)"
        );
        if (allCardNotFinded.length == 0) {
          //Le joueur a gagné
          alert("Bravo, vous avez gagné !");
        }
      } else {
        selectedCards[0].classList.remove("flip");
        selectedCards[1].classList.remove("flip");
      }
      selectedCards = [];
    }, 1000);
  }
}

let allCards = duplicateArray(cards);

//Mélanger le tableau
allCards = shuffleArray(allCards);
allCards.forEach((card) => {
  const cardHtml = createCard(card);
  gameBoard.appendChild(cardHtml);
});
