const baseUrl = 'http://localhost:3000/';

function addFavorite(favorites, id) {
    favorites.push({
        id: id,
        order: favorites.length,
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFavorite(favorites, ind) {
    favorites.splice(ind, 1);
    console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function clickFavorite(event) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    for (let i = 0; i < favorites.length; ++i) {
        if (favorites[i].id === event.currentTarget.dataset.id) {
            removeFavorite(favorites, i);
            event.currentTarget.src = `./assets/img/red-add-favorite.png`;
            return;
        }
    }
    addFavorite(favorites, event.currentTarget.dataset.id);
    event.currentTarget.src = `./assets/img/red-remove-favorite.png`;
}

async function fetchSneakers() {
    const getSneakers = await fetch(`${baseUrl}sneakers`);
    const data = await getSneakers.json();
    console.log(data.sneakers);
    return data.sneakers;
}

async function fetchSneaker(sneakerId) {
    const getSneaker = await fetch(`${baseUrl}sneaker/${sneakerId}`);
    const data = await getSneaker.json();
    return data.sneaker;
}

function createSneakerDiv(sneaker, sneakerCtn) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newSneaker = document.createElement('div');
    newSneaker.classList.add('sneaker');
    newSneaker.dataset.id = sneaker.id;
    let lowerPrice, priceClass, reduction;
    lowerPrice = priceClass = reduction = '';
    let price = parseInt(sneaker.price)
    let newPrice = price - (sneaker.reduction * price / 100);
    if (sneaker.reduction !== 0) {
        reduction = `<div class="reduction"><span class="reduction-ctn">-${sneaker.reduction}%</span></div>`;
        lowerPrice = `<span class="new-price">${newPrice}€</span>`;
        priceClass = ` previous-price`;
    }
    let favoriteImg = 'red-add-favorite';
    favorites.forEach(favorite => {
        if (favorite.id === sneaker.id.toString()) {
            favoriteImg = 'red-remove-favorite';
        }
    })
    newSneaker.innerHTML = `
            <div class="sneaker-img-ctn">
                <img class="favorite-icon" data-id="${sneaker.id}" src="./assets/img/${favoriteImg}.png" alt="favorite-icon" />
                <img class="sneaker-img" src="${baseUrl}${sneaker.img_1}" alt="${sneaker.name} image" />
                ${reduction}
            </div>
            <div class="sneaker-info">
                <div class="sneaker-name">${sneaker.name}</div>
                <div class="sneaker-price">${lowerPrice}<span class="price${priceClass}">${price}€</span></div>
            </div>
            <div class="filler"></div>
            <a href="./sneaker.html?id=${sneaker.id}" class="sneaker-btn">Description</a>
        `;
    sneakerCtn.appendChild(newSneaker);
}