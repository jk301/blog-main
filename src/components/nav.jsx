import { NavLink } from "react-router-dom"


function Nav () {

    return (
        <nav>
            <h1>This is navbar</h1>
            <NavLink to='/' >Home</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
        </nav>
    )
}

export default Nav