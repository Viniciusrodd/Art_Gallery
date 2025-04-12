
// css
import styles from './CreatePost.module.css';

// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'; // Auth Context
import { useInsertDocuments } from '../../hooks/useInsertDocuments'; // custom hook

const CreatePost = () => {
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ body, setBody ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ formError, setFormError ] = useState('');
    
    const { insertDocument, response } = useInsertDocuments('posts'); // from custom hook, 'posts': callback to 'docCollection'
    const { user } = useAuthValue() // user value from context
    const navigate = useNavigate();

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
        <div className={ styles.create_post }>
            <h2>Criar arte</h2>
            <p>Escreva sobre oque você quiser e compartilhe o seu conhecimento!</p>

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

                { !response.loading && <button className='btn'>Criar</button> }
                { response.loading && <button className='btn' disabled>Aguarde...</button> }
                { response.error && <p className='error'>{ response.error }</p> }
                { formError != '' && <p className='error'>{ formError }</p> }
            </form>            
        </div>
    );
};

export default CreatePost;
