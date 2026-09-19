import { useState } from "react"


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

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
            }

            // token
            console.log(data.token)
            localStorage.setItem("token", data.token)

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
