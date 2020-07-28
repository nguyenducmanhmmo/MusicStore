import  axios, {AxiosResponse}  from "axios";
import { baseUrl, token, version, searchAPI, trackAPI, topTrack } from "./setting";


axios.defaults.baseURL = baseUrl;

const responseBody = (response: AxiosResponse) => response.data;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
   
    config.headers.Authorization =  token;

    return config;
});

axios.interceptors.response.use(undefined, error => {
    
    throw error.response;
  });


export const searchArtistByName = (name: string) => {
    return axios.get(version + searchAPI, {params: {q: name, type:"artist"}}).then(responseBody)
}

export const topTrackOfArtirt = (id: string) => {
    return axios.get(version + trackAPI + id + topTrack, {params: {id: id, country :"US"}}).then(responseBody)
}


