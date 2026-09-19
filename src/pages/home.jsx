import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {
                console.log('fetching ')
                const res = await fetch('http://localhost:3000/main/posts')
                const data = await res.json()
                setPosts(data.Posts || [])
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) return <p>Fetching posts..</p>
    if (!loading && posts.length === 0) return <p>No posts available</p>

  return (
    <div>
        { posts.map( post => (
            <div key={post.id} >
                <Link to={`/posts/${post.id}`}>
                    <h2>{ post.title }</h2>
                </Link>
                <p>{ post.content }</p>
            </div>
        ))}
    </div>
  )
}

export default Home
