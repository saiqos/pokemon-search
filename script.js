const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const form = document.getElementById('search-form');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypesContainer = document.getElementById('types');
const pokemonImg = document.getElementById('pokemon-img');

form.addEventListener('submit', e => {
    e.preventDefault();
});

const cleanInput = (input) => {
    return input.trim().toLowerCase();
}

const renderData = (data) => {
    // using data from our response
    pokemonName.innerText = data.name.toUpperCase();
    pokemonId.innerText = '#' + data.id;
    pokemonWeight.innerText = `Weight: ${data.weight}`;
    pokemonHeight.innerText = `Height: ${data.height}`;
    pokemonImg.innerHTML = `<img id='sprite' src=${data.sprites.front_default} alt=${pokemonName}>`;
    data.stats.forEach((el, index) => {
        document.getElementById(`${el.stat.name}`).innerText = el.base_stat;
    });
    data.types.forEach(el => {
        pokemonTypesContainer.innerHTML += `<span class="type type_${el.type.name}">${el.type.name.toUpperCase()}</span>`
    });

    return;
}

const fetchData = async () => {
    pokemonTypesContainer.innerHTML = '';
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${cleanInput(input.value)}`);
        const data = await res.json();
        renderData(data);
        input.value = '';
    } catch (error) {
        alert('Pokémon not found');
        input.value = '';
    }
}

searchBtn.addEventListener('click', fetchData);


