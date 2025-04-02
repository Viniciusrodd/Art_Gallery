// css
import styles from './Register.module.css'

// modules
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication'; //custom hook

const Register = () => {
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    // consts of useAuthentication hook:
    const { createUser, error: authError, loading } = useAuthentication();
    
    // error verify
    useEffect(() => {
        if(error != '' || success != ''){
            const time = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);

            // If error changes before end of time, the clearTimeout avoid multiple timers.
            return () => clearTimeout(time); // clean the timer at desmounting of component
        }
    }, [ error, success ]);

    // fórm submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {
            displayName, email, password, confirmPassword
        };

        if(password != confirmPassword){
            setError('As senhas precisam ser iguais');
            return;
        }

        // check errors at createUser
        if(authError){
            setError(authError);
        }

        const res = await createUser(user);
        if(res){
            setSuccess('Usuário criado com sucesso');
            console.log('response from backend: ', res);        
            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');   
        }
    };



    return (
        <div className={ styles.register }>
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>

            <form onSubmit={handleSubmit}>
                { error && <p className='error'>{ error }</p> }
                { success != '' && <p className='success'>{ success }</p> }       
                
                <label>
                    <span>Nome: </span>
                    <input value={displayName} type="text" name='displayName' required placeholder='Nome de usuário' 
                    onChange={(e) => setDisplayName(e.target.value)} />
                </label>
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
                <label>
                    <span>Confirmação de senha: </span>
                    <input value={confirmPassword} type="password" name='confirmPassword' required placeholder='Confirme sua senha' 
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>

                { !loading && <button className='btn'>Cadastrar</button> }
                { loading && <button className='btn' disabled>Aguarde...</button> }
            </form>
        </div>
    );
};

export default Register;
