import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import './final.css'
import './App.css';
import { mainURL, userInfo, hotels } from "./settings";
import hotelFacade from "./hotelFacade";
import bookingFacade from "./bookingFacade";


function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <div id="formContent">
        <h2>Login</h2>

        <form class="fadeIn second" onChange={onChange} >
          <input placeholder="User Name" class="form-control" id="username" />
          <br></br>
          <div class="fadeIn third"><input placeholder="Password" class="form-control" id="password" /></div>
          <br></br>

          <br></br>

          <div id="formFooter">
            <a class="underlineHover" href="#"><div class="fadeIn fourth"><button class="btn btn-default" onClick={performLogin}>Login</button></div></a>
          </div>
        </form>

      </div></div>
  )

}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    facade.fetchData().then(data => setDataFromServer(data.msg))
      .catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message)
          console.log("error:" + err)
        })
      })
  }, [])

  return (
    <div>

    </div>
  )

}

function Header({ isLoggedIn }) {
  return (
    <>
      <ul className="header">

        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        {isLoggedIn && (
          <li><NavLink activeClassName="active" to="/booking">Booking</NavLink></li>
        )}
        {isLoggedIn && (
        <li><NavLink activeClassName="active" to="/hotel">Hotel Search</NavLink></li>
        )}
        <li><NavLink activeClassName="active" to="/hotels">Hotels</NavLink></li>
      </ul>

      <hr />
    </>
  )
}

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )

}

function Home() {
  return (
    <h2>Dummy Home</h2>
  )
}

function Hotel() {
  let hotelData = hotelFacade.GetHotel();
  return (
    <div>
      {hotelData}
    </div>
  )
}

function AllHotels() {
  let hotelData = hotelFacade.GetAllHotels();
  return (
    <div>
      {hotelData}
    </div>
  )
}

function Booking() {
  let bookingData = bookingFacade();
  return (
    <div>
      {bookingData}
    </div>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => {
        setLoggedIn(true)
        setErrorMessage("")
      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message)
          console.log("error: " + err)
        })
      })
      ;
  }

  return (
    <div>
      <Header loginMSG={loggedIn ? 'Logged in' : 'Log in now'} isLoggedIn={loggedIn}
      />
      <div class="header">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/booking">
            <Booking bookingFacade={bookingFacade} />
          </Route>
          <Route path="/hotel">
            <Hotel hotelFacade={hotelFacade} />
          </Route>
          <Route path="/hotels">
            <AllHotels hotelFacade={hotelFacade} />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
      <div class="wrapper fadeInDown">
        {!loggedIn ?
          (<div><LogIn login={login} />
            {errorMessage}</div>) :
          (<div>
            <LoggedIn />
            <button class="btn btn-default" onClick={logout}>Logout</button>
          </div>)}
      </div>
    </div>
  )

}
export default App;
