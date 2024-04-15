const btnToSneakers = document.querySelector('.btn-to-sneakers');
const sneakersList = document.querySelector('.sneakers-list');
const url = new URLSearchParams(window.location.search);
const visibility = url.get('sneakers');

async function toSneakersClick(event){
    const sneakers = await fetchSneakers();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    sneakers.forEach(sneaker => createSneakerDiv(sneaker, sneakersList));
    sneakersList.style.display = 'flex';
    const pos = sneakersList.offsetTop;
    window.scrollTo({ left: 0, top: pos, behavior: 'smooth'});
    btnToSneakers.removeEventListener('click', toSneakersClick);
    btnToSneakers.addEventListener('click', () => window.scrollTo({ left: 0, top: pos, behavior: 'smooth'}));

    const favoriteImg = document.querySelectorAll('img.favorite-icon');
    favoriteImg.forEach(favorite => {
        favorite.addEventListener('click', clickFavorite);
    });
}

btnToSneakers.addEventListener('click', toSneakersClick);

if (visibility === 'visible') {
    toSneakersClick();
}
