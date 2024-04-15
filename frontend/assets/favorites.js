const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesList = document.querySelector('.favorites-list');
const main = document.querySelector('.main');
main.style.overflow = 'auto';
main.style.height = 'auto';
const removeAllBtn = document.querySelector('.remove-all-btn');

function displayErrorNoFavorites() {
    const errorMsgElement = document.querySelector('.error-msg');
    if (!errorMsgElement) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-msg');
        errorMsg.innerHTML = 'No favorites found.';
        favoritesList.appendChild(errorMsg);
        favoritesList.style.display = 'flex';
    }
}

function removeAllFavorites() {
    localStorage.removeItem('favorites');
    const sneakersElements = document.querySelectorAll('.sneaker');
    sneakersElements.forEach(sneaker => {
        favoritesList.removeChild(sneaker);
    });
    displayErrorNoFavorites();
}

function removeFavoriteFromList(event) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id.toString() === event.currentTarget.dataset.id) {
                removeFavorite(favorites, i);
            }
        }
        const sneakerRemoved = event.currentTarget.parentElement.parentElement;
        favoritesList.removeChild(sneakerRemoved);
        if (favorites.length === 0) {
            displayErrorNoFavorites();
        }
}

async function loadFavorites() {
    for (let i = 0; i < favorites.length; ++i) {
        const id = parseInt(favorites[i].id);
        const sneaker = await fetchSneaker(id);
        createSneakerDiv(sneaker, favoritesList);
    }
    const favoritesIcon = document.querySelectorAll('.favorite-icon');
    favoritesIcon.forEach(favoriteIcon => {
        favoriteIcon.src = `./assets/img/red-cross-mark.png`;
        favoriteIcon.addEventListener('click', removeFavoriteFromList);
    });
    favoritesList.style.display = 'flex';
}

if (favorites.length === 0) {
    displayErrorNoFavorites();
} else {
    loadFavorites();
    const sortable = new Sortable(favoritesList, {
        sort: true,
        animation: 150,
        easing: "cubic-bezier(1, 0, 0, 1)",
        draggable: '.sneaker',
        onEnd: function (event) {
            // var item = event.item;
            const items = document.querySelectorAll('.sneaker');
            let i = 0;
            let newFavorites = [];
            items.forEach((item) => {
                const id = item.dataset.id;
                newFavorites.push({
                    id: id,
                    order: i
                });
                ++i;
            });
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        },
    });
}

removeAllBtn.addEventListener('click', removeAllFavorites);