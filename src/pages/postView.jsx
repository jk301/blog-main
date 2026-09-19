import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Postview () {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getPost () {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`http://localhost:3000/main/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    setPost(data.Post)
                } else if (res.status === 401) {
                    setError("You must be logged in to view this post.")
                } else {
                    const data = await res.json()
                    setError(data.error || "Could not load post :(")
                }

            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getPost()
    }, [postId])

    if (loading) return <p>Loading post.</p>
    if (error) return <p>{error}</p>
    if (!post) return <p>Post not available.</p>

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    )
}

export default Postview