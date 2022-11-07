const linkOfApi = 'https://restcountries.com/v3.1/';

export const fetchCountries = function (name) {
return fetch(`${linkOfApi}name/${name}`).then(response =>{
    if(!response.ok){
    throw new Error(response.status);
}
return response.json()}
    ).catch(err=> console.log(err))
}

