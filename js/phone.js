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
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        `;

        // 4. append child
        phoneContainer.appendChild(phoneCard);


        // hidden spinner
        toggleLoading(false);
    })
}


// show details
const handleShowDetail = async (id) => {
    console.log(id);

    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const phone = await res.json();
    // console.log(data);


    showPhoneDetails(phone);
}

// show phone details
function showPhoneDetails(phone) {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.data.name;

    const phoneDetail = document.getElementById('show-phone-detail');
    phoneDetail.innerHTML = `
        <img src="${phone.data.image}"> <br>
        <p><b>Chipset:</b> ${phone.data.mainFeatures.chipSet}</p>
        <p><b>displaySize:</b> ${phone.data.mainFeatures.displaySize}</p>
        <p><b>memory:</b> ${phone.data.mainFeatures.memory}</p>
        <p><b>storage:</b> ${phone.data.mainFeatures? phone.data.mainFeatures.storage : 'storage details not aviable'}</p>
    `
    my_modal_3.showModal();
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