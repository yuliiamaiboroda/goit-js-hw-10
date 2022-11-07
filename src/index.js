import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import * as markup from './markup'
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
        countryInfoEl.innerHTML= markup.createElementOfCountry(data, languages);
        return ;
    }
    
    counrtyListEl.innerHTML =  markup.createListOfCountries(data) ;

   }).catch(err => { console.log(err);
    Notify.failure('Oops, there is no country with that name')}
    );

}

function clearEl (){
    counrtyListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}