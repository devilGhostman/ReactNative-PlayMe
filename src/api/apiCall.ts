import axios from "axios";
import config from "../../config";

const apiBaseUrl = config.BASE_URL;
const moviesEndpoint = `${apiBaseUrl}/watch`;
const popularMoviesEndpoint = `${apiBaseUrl}/watch/?popular=true`;
const newMoviesEndpoint = `${apiBaseUrl}/watch?new=true`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/watch?rating=true`;

const movieDetailsEndpoint = (id: string) => `${apiBaseUrl}/watch/${id}`;
const searchMoviesEndpoint = (name:string) => `${apiBaseUrl}/watch?search=${name}`

export const imgApibaseurl = config.BASE_URL_IMG;
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const userLoginEnpoint = `${apiBaseUrl}/users/login`
const userRegisterEndpoint = `${apiBaseUrl}/users/signup`

const apiCall = async (method:string, endpoint: string, data?: string|object)=>{
    const options = {
        method: `${method}`,
        url: endpoint,
        data: data ? data: {}
    };
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        throw new Error();
    }
}


export const fetchMovies = ()=>{
    return apiCall('GET',moviesEndpoint)
}
export const fetchPopularMovies = ()=>{
    return apiCall('GET',popularMoviesEndpoint);
}
export const fetchNewMovies = ()=>{
    return apiCall('GET',newMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall('GET',topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id: string)=>{
    return apiCall('GET',movieDetailsEndpoint(id));
}

export const searchMovies = (name: string)=>{
    return apiCall('GET',searchMoviesEndpoint(name));
}

export const userLogin = (userDetails:{email:string,password:string}) =>{
    return apiCall('POST',userLoginEnpoint,userDetails)
}

export const userRegister = (userDetails:{email:string,password:string,phoneNumber:string,userName:string}) =>{
    return apiCall('POST',userRegisterEndpoint,userDetails)
}
