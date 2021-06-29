import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Navbar, Home, Register, Login, Quote, Buy, Index, Sell, History, Logout } from "./components/comp.js"

function App() {

  const [isAuth, setAuth] = useState(false)
  const [status, setStatus] = useState("")

  function authenticate() {
    setAuth(function(){
      return true
    })
  }

  function disauthenticate() {
    setAuth(function(){
      return false
    })
  }

  useEffect(function(){
    let user = localStorage.getItem("user")
    
    if(user)
    {
      authenticate()
      setStatus("Logged In!")
    }
  }, [])


  return (
    <Router>
      <Navbar status={isAuth}/>
      <div class="alert alert-primary" role="alert">
        {status}
      </div>

      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <Home displayMsg={setStatus} authenticate={authenticate} />} />
          <Route path="/register" exact render={() => <Register displayMsg={setStatus} authenticate={authenticate} />} />
          <Route path="/login" exact render={() => <Login authenticate={authenticate} displayMsg={setStatus}/>} />
          
          <Route path="/index" exact component={Index} />
          <Route path="/quote" exact component={Quote} />
          <Route path="/buy" render={() => <Buy displayMsg={setStatus} />} />
          <Route path="/sell" render={() => <Sell displayMsg={setStatus} />} />
          <Route path="/history" exact component={History} />

          <Route path="/logout" exact render={() => <Logout disauthenticate={disauthenticate} displayMsg={setStatus} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;