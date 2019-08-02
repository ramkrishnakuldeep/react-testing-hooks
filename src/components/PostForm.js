import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios';

const PostForm = ({addPost, editingPost}) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [post, setPosts] = useState({title: '', body: ''});

    const onChange = (event) => {
        setPosts({...post, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setPosts(editingPost);
    }, [editingPost]);

    function validateForm() {
        let tempError = {};
        if(post.title.trim() === ''){
            tempError.title = 'Title must not be empty';
        }
        if(post.body.trim() === ''){
            tempError.body = 'Body must not be empty';
        }

        if(Object.keys(tempError).length > 0) {
            setErrors(tempError);
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        
        if(!validateForm()) {
            setLoading(false);
            return;
        }

        setErrors({});
        if(post.id){
            axios.put(`/post/${post.id}`, post).then(res => {
                console.log(res.data);
                setPosts({title: '', body: ''});
                addPost(res.data);
                setLoading(false);
    
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.post('/post', post).then(res => {
                console.log(res.data);
                setPosts({title: '', body: ''})
                addPost(res.data);
                setLoading(false);
    
            }).catch(err => {
                console.error(err);
            });
        }
    }

    return (
        <Fragment>
            { !loading ? (
                <form className="push-in" onSubmit={onSubmit}>
                    <div className="input-field">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input type="text" name="title" value={post.title} onChange={onChange}
                            className={errors.title && 'invalid'} />
                        <span className="helper-text">{errors.title}</span>
                    </div>

                    <div className="input-field">
                        <label htmlFor="body">
                            Body
                        </label>
                        <input type="text" name="body" value={post.body} onChange={onChange}
                            className={errors.body && 'invalid'} />
                        <span className="helper-text">{errors.body}</span>
                    </div>
                    <button type="submit" className="waves-effect waves-light btn">
                        {post.id ? 'Update': 'Add'}
                    </button>

                </form>
            ) : (
                <div className="progress">
                    <div className="indeterminate">

                    </div>
                </div>
            )}
        </Fragment>
    )
}


export default PostForm;