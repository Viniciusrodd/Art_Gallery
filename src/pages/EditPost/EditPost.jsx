
// css
import styles from './EditPost.module.css';

// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'; // Auth Context
import { useInsertDocuments } from '../../hooks/useInsertDocuments'; // custom hook
import { useFetchPost } from '../../hooks/useFetchPost'; // custom hook

const EditPost = () => {
    const { id } = useParams();
    const { document: post, loading, error } = useFetchPost('posts', id);
    const navigate = useNavigate();

    useEffect(() => {
        if(post){
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);
            const textTags = post.tags.join(', ')
            setTags(textTags);
        }
    }, [ post ]);

    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ body, setBody ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ formError, setFormError ] = useState('');
    
    const { insertDocument, response } = useInsertDocuments('posts'); // from custom hook, 'posts': callback to 'docCollection'
    const { user } = useAuthValue() // user value from context

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormError(''); //reseting prev errors

        // validation url image
        try{
            new URL(image);
        } 
        catch(error){
            setFormError("A imagem precisa ser uma URL.");
            return;
        }

        // create array of tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if(tagsArray.length === 0 || tagsArray.some(tag => tag === '')){
            setFormError('Por favor, insira ao menos 1 tag válida');
            return;
        }

        // check all the values
        if (!title || !image || !body || tagsArray.length === 0) {
            setFormError("Por favor, preencha todos os campos!");
            return;
        }

        console.log({
            title, image, body, tags: tagsArray, uid: user.uid, createdBy: user.displayName
        });

        insertDocument({ 
            title, image, body, tags: tagsArray, userId: user.uid, createdBy: user.displayName 
        })

        // redirect to homepage
        navigate("/");
    };

    return (
        <div className={ styles.edit_post }>
            <h2>Editando post: { title }</h2>
            <p>Altere os dados do post como desejar...</p>

            { post && (
                <>    
                    <form onSubmit={ handleSubmit }>
                        <label>
                            <span>Titulo: </span>
                            <input type="text" name="title" required placeholder='Pense em um bom título...'
                            onChange={ (e) => setTitle(e.target.value) } value={ title } />    
                        </label>

                        <label>
                            <span>Url da imagem: </span>
                            <input type="text" name="image" required placeholder='Insira uma imagem que representa o seu post'
                            onChange={ (e) => setImage(e.target.value) } value={ image } />    
                        </label>

                        <p className={ styles.preview_title }>Preview da imagem atual: </p>
                        <img className={ styles.image_preview } src={ image } alt={ title } />

                        <label>
                            <span>Conteúdo: </span>
                            <textarea name='body' required placeholder='Insira o conteúdo do post'
                            onChange={ (e) => setBody(e.target.value) } value={ body } ></textarea>
                        </label>

                        <label>
                            <span>Tags: </span>
                            <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula'
                            onChange={ (e) => setTags(e.target.value) } value={ tags } />    
                        </label>

                        { !response.loading && <button className='btn'>Editar</button> }
                        { response.loading && <button className='btn' disabled>Aguarde...</button> }
                        { response.error && <p className='error'>{ response.error }</p> }
                        { formError != '' && <p className='error'>{ formError }</p> }
                    </form>            
                </>
            )}

        </div>
    );
};

export default EditPost;

