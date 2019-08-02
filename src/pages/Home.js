import React, {useEffect, useState} from 'react'
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [editingPost, setEditingPost] = useState({title: '', body: '', id: null});

    async function fetchPosts() {
        let response = await axios.get('/posts');
        console.log(response.data);
        setPosts(response.data);
    }
    
    useEffect(() => {
        fetchPosts();
    }, []);

    function editPost(post) {
        console.log(post);
        setEditingPost(post);

    }

    function deletePost(id) {
        axios.delete(`/post/${id}`).then(() => {
            const updatedPosts = posts.filter(p => p.id !== id);
            setPosts(updatedPosts);
        }).catch(error => {
            console.error(error);
        })
    }

    const getNumberOfPosts = () => {
        axios.get(`/posts/${limit}`).then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.error(err);
        })
    }
    const addPost = (post) => {

        if(posts.find(p => p.id === post.id)){
            const index = posts.findIndex(p => p.id === post.id);
            const updatedPosts = [...posts];
            updatedPosts.splice(index, 1, post);
            setPosts(updatedPosts);
        } else {
            const updatedPosts = [...posts, post];
            setPosts(updatedPosts);
        }

        
    }

    return (
        <div>
            <div className='row'>
                <div className='col s6'>
                    <PostForm addPost={addPost} editingPost={editingPost} />
                </div>
                <div className="col s3 push-in">
                    <p>
                        Limit number of posts
                    </p>
                    <input type="number" value={limit} name="limit" onChange={event => setLimit(event.target.value)} />
                    <button className="waves-effect waves-light btn" onClick={getNumberOfPosts}>
                        Set
                    </button>
                </div>
            </div>
            
            <div className='row'>
                {
                    posts.map(post => (
                        <div className='col s6' key={post.id}>
                            <div className='card'>
                                <div className='card-content'>

                                
                                <div className='card-title'>
                                    {post.title}
                                </div>
                                <p className='timestamp'>
                                    {post.createdAt}
                                </p>
                                <p className='card-body'>
                                    {post.body}
                                </p>
                                
                                </div>
                                <div className='card-action'> 
                                    <a onClick={editPost.bind(null, post)}>
                                        Edit
                                    </a>
                                    <a className='delete-btn' onClick={deletePost.bind(null, post.id)}>
                                        Delete
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}

export default Home
