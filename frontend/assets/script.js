const btnToSneakers = document.querySelector('.btn-to-sneakers');
const sneakersList = document.querySelector('.sneakers-list');
const baseUrl = 'http://localhost:3000/';

async function fetchSneakers() {
    const getSneakers = await fetch(`${baseUrl}sneakers`);
    const data = await getSneakers.json();
    console.log(data.sneakers);
    return data.sneakers;
}

async function toSneakersClick(event){
    const sneakers = await fetchSneakers();
    sneakers.forEach(sneaker => {
        const newSneaker = document.createElement('div');
        newSneaker.classList.add('sneaker');
        let lowerPrice, priceClass, reduction;
        lowerPrice = priceClass = reduction = '';
        let price = parseInt(sneaker.price)
        let newPrice = price - (sneaker.reduction * price / 100);
        if (sneaker.reduction !== 0) {
            reduction = `<div class="reduction"><span class="reduction-ctn">-${sneaker.reduction}%</span></div>`;
            lowerPrice = `<span class="new-price">${newPrice}€</span>`;
            priceClass = ` previous-price`;
        }
        newSneaker.innerHTML = `
            <div class="sneaker-img-ctn">
                <img src="${baseUrl}${sneaker.img_1}" alt="${sneaker.name} image" />
                ${reduction}
            </div>
            <div class="sneaker-info">
                <div class="sneaker-name">${sneaker.name}</div>
                <div class="sneaker-price">${lowerPrice}<span class="price${priceClass}">${price}€</span></div>
            </div>
            <div class="filler"></div>
            <a href="./sneaker.html?id=${sneaker.id}" class="sneaker-btn">Description</a>
        `;
        sneakersList.appendChild(newSneaker);
    })
    sneakersList.style.display = 'flex';
    const pos = sneakersList.offsetTop;
    window.scrollTo({ left: 0, top: pos, behavior: 'smooth'});
    btnToSneakers.removeEventListener('click', toSneakersClick);
    btnToSneakers.addEventListener('click', () => window.scrollTo({ left: 0, top: pos, behavior: 'smooth'}));
}

btnToSneakers.addEventListener('click', toSneakersClick);