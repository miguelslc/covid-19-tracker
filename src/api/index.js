import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const newsAPI_KEY = 'YOUR-API-KEY-FROM-NEWS-API'
const newsUrl =`https://newsapi.org/v2/everything?q=covid-19&apiKey=${newsAPI_KEY}`;

export const fetchData = async (country) => {

    let changeableUrl = url;
    if (country) 
        changeableUrl = `${url}/countries/${country}`;
    try {
        //Obtenemos los datos que necesitamos y no todo el conjunto 
        //que devuelve la API
        //Destructuramos sobre una Destructuracion - HERMOSO
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        return error;
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error){
        return error;
    }
}

export const fetchCountries = async() =>{
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
}

export const fetchNewsApiData = async () => {
    let changeableUrl = newsUrl;
    try {
        //Obtenemos los datos que necesitamos y no todo el conjunto 
        //que devuelve la API
        //Destructuramos sobre una Destructuracion - HERMOSO
        const {data: {articles}} = await axios.get(changeableUrl);
        const modifiedNewsData = articles.map((article)=>({
            name: article.source.name,
            title: article.title,
            description: article.description,
            content: article.content,
            publishedAt: article.publishedAt
        }));
        
        return modifiedNewsData;
    } catch (error) {
        return error;
    }
}