import facade from "./apiFacade";
import {jokeURL} from "./settings";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function myDemoFacade() {
    const fetchData = (url) => {
        const options = facade.makeOptions("GET", true);
        return fetch(jokeURL, options).then(handleHttpErrors);
    }

    const getJoke = () => {
        const data = fetchData();
        return data;
    }

    return {
        getJoke
    }
}

const jokeFacade = myDemoFacade();
export default jokeFacade;