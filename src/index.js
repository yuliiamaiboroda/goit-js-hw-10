import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const counrtyListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input',debounce(handleSeachCountry , DEBOUNCE_DELAY) );

function handleSeachCountry(){
   const inputOfCountry = inputEl.value.trim();
    if (inputOfCountry ===""){
        clearEl();
        return;
    }
   fetchCountries(inputOfCountry).then(data => {
   clearEl();


   if(data.length === 0){
    Notify.failure('Oops, there is no country with that name');
    return;
    }

   if(data.length> 10){
    Notify.warning('Too many matches found. Please enter a more specific name.');
    return;
   }

    if(data.length === 1){
        const langObj = data[0].languages;
        const languages = Object.values(langObj);
        countryInfoEl.innerHTML= createElementOfCountry(data, languages);
        return ;
    }
    
    counrtyListEl.innerHTML =  createListOfCountries(data) ;

   }).catch(err => Notify.failure('Oops, there is no country with that name'));

}

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


function clearEl (){
    counrtyListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}