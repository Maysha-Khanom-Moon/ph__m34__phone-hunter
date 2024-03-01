const loadPhone = async (searchText = 'iphone') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    // console.log(data);
    displayPhones(phones);
}


// 1. select parent div
const phoneContainer = document.getElementById('phone-container')

const displayPhones = phones => {
    console.log(phones);
    phoneContainer.innerHTML = '';

    phones.forEach(phone => {
        // console.log(phone);

        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-full bg-base-100 shadow-xl`;

        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
           <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;

        // 4. append child
        phoneContainer.appendChild(phoneCard);
    })
}


// handle search
function handleSearch() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhone(searchText)
}


loadPhone();