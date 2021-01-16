import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './final.css'
import './App.css';
import { mainURL, userInfo, hobbyInfo } from "./settings";
import Hobbys from './hobbys.js';
import hobbyFacade from "./hobbyFacade";
import jokeFacade from "./jokeFacade";


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
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      {errorMessage}
    </div>
  )

}

function Header({ isLoggedIn }) {
  return (
    <>
      <ul className="header">

        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        {isLoggedIn && (
          <li><NavLink activeClassName="active" to="/hobbies">Hobbies</NavLink></li>
        )}
        <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
        <li><NavLink activeClassName="active" to="/joke">Joke</NavLink></li>
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

const Users = () => {
  const [usersData, setUsersData] = useState("")

  useEffect(() => {
    hobbyFacade.getUser().then(data => setUsersData(data));
  }, [])
  return (
    <div>
      <h2>All users:</h2>
      <h2>{usersData}</h2>
    </div>
  )
}

const Hobby = () => {
  const init = {
    name: "",
    type: ""
  }
  const [hobbyData, setHobbyData] = useState(init)

  useEffect(() => {
    hobbyFacade.getHobby().then(data => setHobbyData(data));
    console.log(hobbyData.value)
  }, [])

  return (
    <div>
      <h2>Hobbies</h2>
      <li>
        {JSON.stringify(hobbyData)}
      </li>
      <li>Hobby: {hobbyData.name}</li>
    </div>
  )
}

const Joke = () => {
  const init = {
    joke: "",
    url: ""
  }
  const [joke, setJoke] = useState(init);

  useEffect(() => {
    jokeFacade.getJoke().then(data => setJoke(data));
    console.log(joke.value)
  }, [])
  return (
    <div>
      <h2>Chuck Joke</h2>
      <li>Joke: {joke.value}</li>
      <li>Url: {joke.url}</li>
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
          <Route path="/hobbies">
            <Hobby />
          </Route>
          <Route path="/company">
          </Route>
          <Route path="/joke">
            <Joke />
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
