import { mainURL, hotels, bookings } from "./settings";
const URL = "http://localhost:8080/startkodeca3";
 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
 /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const logout = () => {
  localStorage.removeItem("jwtToken");
} 

const login = (user, password) => {
  const options = makeOptions("POST", true, {
    username: user,
    password: password,
  });
  return fetch(URL + "/api/login", options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
};

const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
}

const fetchDefault = (callback) => {
  const options = makeOptions("GET")
  return fetch("http://localhost:8080/startkodeca3/api/hotel/all", options)
  .then(handleHttpErrors)
  .then(data => {callback(data)})
}

const addBooking = (booking) => {
  const options = makeOptions("POST", true, booking);
  return fetch(mainURL + bookings, options)
  .then(handleHttpErrors)
  .then((data) => {
    console.log(mainURL + bookings, options);
  })
}

const fetchBookings = (callback, name) => {
  const options = makeOptions("GET", true);
  return fetch(mainURL + bookings + "/" + name, options)
  .then(handleHttpErrors)
  .then((data) => {
    console.log(data)
    callback(data);
  })
}

const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
 return {
     makeOptions,
     setToken,
     getToken,
     loggedIn,
     login,
     logout,
     fetchData,
     fetchDefault,
     addBooking,
     fetchBookings
 }
}

const facade = apiFacade();
export default facade;
