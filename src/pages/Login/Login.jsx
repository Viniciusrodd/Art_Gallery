// css
import styles from './Login.module.css';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication'; //custom hook


const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    
    const { loading, login, error: authError } = useAuthentication(); // custom hook returns
    
    useEffect(() => {
        if(error != ''){
            const time = setTimeout(() => {
                setError('');
            }, 3000);

            return () => clearTimeout(time);
        }
    }, [ error ]);
    

    // fórm submit
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const user = {
            email, password
        };
        
        if(authError){
            setError(authError);
        }

        await login(user);
    };

    return (
        <div className={ styles.login }>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema...</p>

            <form onSubmit={handleSubmit}>
                { error && <p className='error'>{ error }</p> }
                
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
