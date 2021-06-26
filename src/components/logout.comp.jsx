import axios from "axios"
import { useHistory } from "react-router"

function Logout(props) {

    let history = useHistory()

    axios.get("/users/logout", {withCredentials: true})
        .then((res) => {
            console.log(res.data)
            props.displayMsg(res.data)
        })
        .catch((err) => console.log(err))

    localStorage.clear()
    props.disauthenticate()
    history.push("/")

    return (
        <div className="container">
            Logging out
        </div>
    )
}

export default Logout