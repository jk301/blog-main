import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Nav ({ logged, setLogged }) {
    const navigate = useNavigate()
    function handleLogout () {
        if (!logged) {
            console.log('Not logged in.')
            return 
        }
        localStorage.removeItem("token")
        console.log('Token removed.')
        setLogged(false)
        navigate('/')
    }

    return (
        <nav>
            <h1>This is navbar</h1>
            <NavLink to='/' >Home</NavLink>
            { logged ? <div className="nav-but"><button onClick={handleLogout} >Logout</button></div>
                : <div className="nav-but">
                    <NavLink to='/register'>Register</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                </div>
            }
        </nav>
    )
}

export default Nav