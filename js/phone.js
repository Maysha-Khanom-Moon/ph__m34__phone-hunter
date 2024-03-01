const loadPhone = async (searchText = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    // console.log(data);
    displayPhones(phones, isShowAll);
}


// 1. select parent div
const phoneContainer = document.getElementById('phone-container')
const showAllCard = document.getElementById('show-all-container');

const displayPhones = (phones, isShowAll) => {
    console.log(phones);
    phoneContainer.innerHTML = '';

    if(phones.length > 8 && !isShowAll) {
        showAllCard.classList.remove('hidden');
        phones = phones.slice(0, 8);
    }
    else {
        showAllCard.classList.add('hidden');
    }

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


        // hidden spinner
        toggleLoading(false);
    })
}


// handle search
function handleSearch(isShowAll) {
    // show spinner
    toggleLoading(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhone(searchText, isShowAll)
}


const toggleLoading = (isLoading) => {
    const loading = document.getElementById('loading');

    if(isLoading) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// handle show all
function handleShowAll() {
    handleSearch(true);
}

loadPhone();