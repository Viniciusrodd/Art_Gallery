
// css
import styles from './Post.module.css';

// hooks
import { useParams } from 'react-router-dom';
import { useFetchPost } from '../../hooks/useFetchPost'; // custom hook
import { useEffect } from 'react';

const Post = () => {
    const { id } = useParams();
    const { document: post, loading, error } = useFetchPost('posts', id);

    return (
        <div>
            { loading && <p>Carregando Post...</p> }
            { error && <p>{ error }</p> }
            { post && (
                <>
                    <h1>{ post.title }</h1>
                    <img src={ post.image } alt="" />
                    <p>Criado por: { post.createdBy }</p>
                </>
            ) }
        </div>
    );
};

export default Post;
