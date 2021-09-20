const startAddMovieButton = document.getElementById("start-add-movie-btn");
const addMovieModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const addMovieButtton = cancelAddMovieButton.nextElementSibling;
const deleteModal = document.getElementById("delete-modal");
const cancelDeleteMovieButton = deleteModal.querySelector(".btn--passive");
const userInputList = addMovieModal.querySelectorAll("input");
const entryText = document.getElementById("entry-text");
const moviesList = [];
const updateUI = () => {
  if (moviesList.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};
const deleteMovie = (id) => {
  let movieIndex = 0;
  for (const movie of moviesList) {
    if (id === movie.id) {
      break;
    }
    movieIndex++;
  }
  moviesList.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  cancelMovieDeletion();
};
const deleteMovieHandler = (id) => {
  deleteModal.classList.toggle("visible");
  toggleBackdrop();
  let deleteMovieButton = deleteModal.querySelector(".btn--danger");
  deleteMovieButton.replaceWith(deleteMovieButton.cloneNode(true));
  deleteMovieButton = deleteModal.querySelector(".btn--danger");
  deleteMovieButton.addEventListener("click", deleteMovie.bind(null, id));
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}">
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 Stars</p>
  </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};
const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteModal.classList.remove("visible");
};
const clearUserInput = () => {
  for (const userInput of userInputList) {
    userInput.value = "";
  }
};
const toggleBackdrop = () => {
  backDrop.classList.toggle("visible");
};
const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};
const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearUserInput();
  toggleBackdrop();
};
const cancelDeleteMovieHandler = () => {
  cancelMovieDeletion();
};
const addMovieHandler = () => {
  const titleValue = userInputList[0].value;
  const imageUrlValue = userInputList[1].value;
  const rateValue = userInputList[2].value;
  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    rateValue.trim() === "" ||
    +rateValue < 1 ||
    +rateValue > 5
  ) {
    alert("Please enter valid values!");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rate: rateValue,
  };
  moviesList.push(newMovie);
  console.log(moviesList);
  toggleBackdrop();
  closeMovieModal();
  clearUserInput();
  renderNewMovieElement(newMovie.id, titleValue, imageUrlValue, rateValue);
  updateUI();
};
startAddMovieButton.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
addMovieButtton.addEventListener("click", addMovieHandler);
cancelDeleteMovieButton.addEventListener("click", cancelDeleteMovieHandler);
