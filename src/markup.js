export{ createElementOfCountry ,createListOfCountries};

function createElementOfCountry(country, languages){
    return country.map(country=>{
        return `<h2><img src="${country.flags.svg}" alt="${country.name.official}" width = 40px class="country__flag"> ${country.name.official}</h2> 
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${[...languages].join(' , ')}</p>`
    }).join('');
   
}


function createListOfCountries (countries){
    return countries.map(el=>{
        return `<li class="list__countries"><img src="${el.flags.svg}" alt="${el.name.official}" width = 40px 
         class="country__flag"> ${el.name.official}</li>`
    } ).join('');
}


