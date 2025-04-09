
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
        <div className={ styles.post_container }>
            { loading && <p>Carregando Post...</p> }
            { error && <p>{ error }</p> }
            { post && (
                // it can use 'postDetail.jsx' component...
                <>
                    <h1>{ post.title }</h1>
                    <img src={ post.image } alt={ post.title } />
                    <p>{ post.body }</p>
                    <h3>Este post trata sobre: </h3>
                    <div className={ styles.tags }>
                        { post.tags.map((tag) => (
                            <p key={ tag }>
                                <span>#</span>
                                { tag }
                            </p>
                        )) }
                    </div>
                </>
            ) }
        </div>
    );
};

export default Post;
