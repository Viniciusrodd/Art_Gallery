
// css
import styles from './Dashboard.module.css';

// components
import { Link } from 'react-router-dom';

// contexts
import { useAuthValue } from '../../context/AuthContext'; // custom hook

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'; // custom hook
import { useDeleteDocuments } from '../../hooks/useDeleteDocuments'; // custom hook

const Dashboard = () => {
    const { user } = useAuthValue();
    const userID = user.uid;
    const { documents: posts, loading, error } = useFetchDocuments('posts', null, userID); // useFetchDocuments
    const { deleteDocument, response } = useDeleteDocuments('posts');

    // won't even come in my jsx page
    if(loading){
        return <p>Carregando...</p>
    }
    

    return (
        <div className={ styles.dashboard }>
            { error && <p>{ error }</p> }

            <h2>DashBoard</h2>        
            <p>Gerencie os suas artes</p>
            
            { posts && posts.length === 0 ? (
                <div className={ styles.noposts }>
                    <p>Não foram encontradas artes...</p>
                    <Link to='/posts/create' className='btn'>Criar primeira arte</Link>
                </div>
            ) : (
                <>
                    {/* headers of post */}
                    <div className={ styles.post_header }>
                        <span>Titulo</span>
                        <span>Ações</span>
                    </div>

                    {/* body of post */}
                    { posts && posts.map((post) => (
                        <div key={ post.id } className={ styles.post_row }>
                            <p>{ post.title }</p>
                            <div>
                                <Link to={`/posts/${ post.id }`} className='btn btn-outline'>
                                    Ver
                                </Link>
                                <Link to={`/posts/edit/${ post.id }`} className='btn btn-outline'>
                                    Editar
                                </Link>
                                <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    )) }
                </>
            )}

        </div>
    );
};

export default Dashboard;
