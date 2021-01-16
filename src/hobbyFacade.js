import facade from "./apiFacade";
import {mainURL} from "./settings";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function myDemoFacade() {
    const fetchData = (url) => {
        const options = facade.makeOptions("GET", true);
        return fetch("http://localhost:8080/startkodeca3" + url, options).then(handleHttpErrors);
    }

    const getHobby = () => {
        const data = fetchData("/api/hobby/all");
        return data;
    }

    const getUser = () => {
        const data = fetchData("/api/info/all");
        return data;
    }
    return {
        getHobby,
        getUser
    }
}

const hobbyFacade = myDemoFacade();
export default hobbyFacade;