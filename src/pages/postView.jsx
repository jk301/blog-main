import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Postview () {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comError, setComError] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    // for user id
    const token = localStorage.getItem("token")
    let userId = null
    if (token) {
        userId = JSON.parse(atob(token.split('.')[1])).id
    }

    useEffect(() => {
        getPost()
    }, [postId])

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


    async function handlePostComment(e) {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`http://localhost:3000/main/posts/${postId}/comments`, {
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }, 
                body: JSON.stringify({ text: comment })
            })

            const data = await res.json()

            if (!res.ok) {
                setComError(data.error || "Could not post comment :(")
                return 
            }

            setComment('')

            getPost()

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    async function handleComDel (commentId) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(
                `http://localhost:3000/main/posts/${postId}/comments/${commentId}/delete`, 
                {
                method: 'DELETE', 
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }}
            )

            const data = await res.json()

            if (!res.ok) {
                setComError(data.error || "Could not delete comment :(")
                return 
            }

            getPost()
        } catch (error) {
            console.log(error)
            setComError('Network error.')
        }
    }

    if (loading) return <p>Loading post.</p>
    if (error) return <p>{error}</p>
    if (!post) return <p>Post not available.</p>

    return (
        <div className="post-view">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="comment-input">
                {comError && <p>{comError}</p>}
                <form onSubmit={handlePostComment}>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Leave a comment!"
                        rows={4}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="post-comment">
                {post.comments.map(com => (
                    <div key={com.id} className="comment">
                        <h3>{com.content}</h3>
                        <p>Posted at {com.createdAt}</p>
                        <p>User {com.name}</p>
                        {com.userId === userId 
                            && <button >Edit comment</button> 
                        }
                        {com.userId === userId 
                            && <button onClick={() => handleComDel(com.id)}>Delete comment</button> 
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Postview