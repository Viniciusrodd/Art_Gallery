
// css
import styles from './Home.module.css';

// hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// component
import PostDetail from '../../components/PostDetails/PostDetail';

const Home = () => {
    const [ query, setQuery ] = useState('');
    const { documents: posts, loading, error } = useFetchDocuments('posts'); //posts is my docCollection
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(query != ''){
            return Navigate(`/search?q=${ query }`);
        }
    };

    return(
        <div className={ styles.home }>
            <h1>Veja as publicações mais recentes...</h1>
            
            <form onClick={ handleSubmit } className={ styles.search_form }>
                <input type="text" placeholder='Ou busque por tags...'
                onChange={ (e) => setQuery(e.target.value) } />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>

            <div>
                <h1>Artes...</h1>
                { loading && <p>Carregando...</p> }
                { posts && posts.map((post) => (
                    <PostDetail key={ post.id } post={ post } />
                )) }
                { posts && posts.length === 0 && (
                    <div className={ styles.noposts }>
                        <p>Não foram encontradas artes</p>
                        <Link to='/posts/create' className='btn'>Publicar primeira arte</Link>
                    </div> 
                )}
            </div>
        </div>
    );
};

export default Home; 