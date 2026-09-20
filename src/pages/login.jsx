import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


function Login({ logged, setLogged }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect (() => {
        if (logged) {
            console.log('already logged in, returning home.')
            navigate('/')
            return 
        }      
    }, [logged, navigate])


    async function handleLogin (e) {
        e.preventDefault()
        setError('') 

        try {
            const res = await fetch('http://localhost:3000/main/login', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Something went wrong.")
                return 
            }

            // token
            setLogged(true)
            console.log('Logged in.')
            localStorage.setItem("token", data.token)
            navigate('/')

        } catch (err) {
            console.log(err)
            setError("Network error, try again.")
        }
    }

  return (
    <div className="login">
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <button type="submit" >Submit</button>
        </form>
    </div>
  )
}

export default Login
