
// css
import styles from './Search.module.css';

// components
import PostDetail from '../../components/PostDetails/PostDetail';

// hooks
import { useQuery } from '../../hooks/useQuery'; // custom hook to return url params
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Search = () => {
    const query = useQuery();
    const search = query.get("q"); // get() is a method from "URLSearchParams()" by custom hook for get params
    const { documents: posts } = useFetchDocuments('posts', search);

    useEffect(() =>{
        console.log('query string get in url: ', search);
    }, []);

    return (
        <div className={ styles.search_container }>
            <h1>Search</h1>
            <div>
                { posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to='/' className='btn btn-dark'>Voltar</Link>
                    </>
                ) }
                { posts && posts.map((post) => (
                    <PostDetail key={ post.id } post={ post } />
                )) }
            </div>
        </div>
    );
};

export default Search;