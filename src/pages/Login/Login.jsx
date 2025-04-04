// css
import styles from './Login.module.css';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication'; //custom hook


const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { loading, createUser, error: authError } = useAuthentication(); // custom hook returns
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    useEffect(() => {
        if(error != '' || success != ''){
            const time = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);

            return () => clearTimeout(time);
        }
    }, [ error, success ]);
    

    // fórm submit
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const user = {
            email, password
        };

        const res = await createUser(user);
        console.log(res);

        if(authError){
            setError(authError);
        }
    };

    return (
        <div className={ styles.login }>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema...</p>

            <form onSubmit={handleSubmit}>
                { error && <p className='error'>{ error }</p> }
                { success != '' && <p className='success'>{ success }</p> }       
                
                <label>
                    <span>Email: </span>
                    <input value={email} type="email" name='email' required placeholder='E-mail de usuário' 
                    onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha: </span>
                    <input value={password} type="password" name='password' required placeholder='Insira sua senha' 
                    onChange={(e) => setPassword(e.target.value)}/>
                </label>

                { !loading && <button className='btn'>Entrar</button> }
                { loading && <button className='btn' disabled>Aguarde...</button> }
            </form>
        </div>
    );
};

export default Login;
