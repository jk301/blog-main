import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home({ logged }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {
                console.log('fetching ')
                if (logged) {
                    const token = localStorage.getItem("token")
                    const res = await fetch('http://localhost:3000/main/posts/all', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}` 
                        }
                    })
                    const data = await res.json()
                    setPosts(data.posts || [])
                } else {
                    const res = await fetch('http://localhost:3000/main/posts/lim')
                    const data = await res.json()
                    setPosts(data.posts || [])
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [logged])

    if (loading) return <p>Fetching posts..</p>
    if (!loading && posts.length === 0) return <p>No posts available</p>

  return (
    <div className="home-post-container">
        { posts.map( post => (
            <div key={post.id} >
                <Link to={`/posts/${post.id}`}>
                    <h2>{ post.title }</h2>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Home
