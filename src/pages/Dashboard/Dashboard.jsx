
// css
import styles from './Dashboard.module.css';

// components
import { Link } from 'react-router-dom';

// contexts
import { useAuthValue } from '../../context/AuthContext'; // custom hook

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'; // custom hook

const Dashboard = () => {
    const { user } = useAuthValue();
    const userID = user.uid;
    const { documents: posts, loading, error } = useFetchDocuments('posts', null, userID);

    return (
        <div>
            { loading && <p>Carregando...</p> }
            { error && <p>{ error }</p> }

            <h2>DashBoard</h2>        
            <p>Gerencie os seus posts</p>
            
            { posts && posts.length === 0 ? (
                <div className={ styles.noposts }>
                    <p>Não foram encontrados posts...</p>
                    <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
                </div>
            ) : (
                <div>
                    <p>Possui posts...</p>
                </div>
            )}

            { posts && posts.map((post) => (
                <h3 key={ post.id }>{ post.title }</h3>
            )) }
        </div>
    );
};

export default Dashboard;
