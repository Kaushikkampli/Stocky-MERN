import React, {useEffect} from "react"
import { useHistory } from "react-router-dom"

function Home(props) {

    const history = useHistory()

    useEffect(function(){
        let user = localStorage.getItem("user")
        
        if(user)
        {
            props.authenticate()
            props.displayMsg("Logged In!")
            history.push("/index")
        }
    }, [history,props])


    return (
        <div>
            <h3>Afraid of losing money by investing in stocks? Get your feet wet in the virtual world!</h3>

            <p>
                Introducing Stocky! A completely gamified clone of the real ones. You will start off with 10000$ in your Wallet. 
            </p>
        </div>
        
    )
}

export default Home