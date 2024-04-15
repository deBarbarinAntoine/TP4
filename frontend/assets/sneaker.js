const url = new URLSearchParams(window.location.search);
const sneakerId = parseInt(url.get('id'));
const mainCtn = document.querySelector('.main-ctn');

async function loadSneaker() {
    const sneaker = await fetchSneaker(sneakerId);
    let lowerPrice, priceClass, reduction, colors, sizes;
    lowerPrice = priceClass = reduction = colors = sizes = '';
    let price = parseInt(sneaker.price)
    let newPrice = price - (sneaker.reduction * price / 100);
    const colorArr = sneaker.colors.split('/');
    const sizeArr = sneaker.sizes.split(';');
    colorArr.forEach(color => {
        colors += `<div class="color">${color}</div>`;
    });
    sizeArr.forEach(size => {
        sizes += `<div class="size">${size}</div>`;
    });
    if (sneaker.reduction !== 0) {
        reduction = `<div class="reduction"><span class="reduction-ctn">${sneaker.reduction}% off</span></div>`;
        lowerPrice = `<span class="new-price">${newPrice}€</span>`;
        priceClass = ` previous-price`;
    }
    const available = sneaker.available ? `<span class="label available">Available</span>` :
        `<span class="label unavailable">Not available</span>`;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoriteImg = 'red-add-favorite';
    favorites.forEach(favorite => {
        if (favorite.id === sneaker.id.toString()) {
            favoriteImg = 'red-remove-favorite';
        }
    })
    const sneakerDiv = `
        <div class="sneaker">
            <div class="sneaker-img-ctn">
                <img class="favorite-icon" data-id="${sneaker.id}" src="./assets/img/${favoriteImg}.png" alt="favorite-icon" />
                <img class="sneaker-img" src="${baseUrl}${sneaker.img_1}" alt="${sneaker.name} image" />
            </div>
            <div class="sneaker-info">
                <div class="sneaker-name">${sneaker.name}</div>
                <div class="sneaker-price">${lowerPrice}<span class="price${priceClass}">${price}€</span></div>
                ${reduction}
                <div class="release-date"><span class="label">Release date: </span><span class="txt">${sneaker.release_date}</span></div>
                <div class="colors"><span class="label">Colors available: </span><div class="color-list">${colors}</div></div>
                <div class="delivery-time"><span class="label">Delivery time: </span><span class="txt">${sneaker.delivery_time} days</span></div>
                ${available}
                <div class="sizes"><span class="label">Sizes available: </span><div class="size-list">${sizes}</div></div>
                <a class="return-btn" href="./index.html?sneakers=visible">Return</a>
            </div>
        </div>
    `;
    mainCtn.innerHTML = sneakerDiv;

    const favorite = document.querySelector('img.favorite-icon');
    favorite.addEventListener('click', clickFavorite);
}

loadSneaker();