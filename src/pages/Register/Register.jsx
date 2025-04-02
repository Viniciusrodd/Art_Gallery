// css
import styles from './Register.module.css'

// modules
import { useState, useEffect } from 'react';

const Register = () => {
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            displayName, email, password, confirmPassword
        }

        if(password != confirmPassword){
            setError(true);
            return
        }

        console.log(user);
    };

    useEffect(() => {
        if(error){
            const time = setTimeout(() => {
                setError(false)
            }, 3000);

            // If error changes before end of time, the clearTimeout avoid multiple timers.
            return () => clearTimeout(time); // clean the timer at desmounting of component
        }
    }, [ error ]);

    return (
        <div className={ styles.register }>
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>

            <form onSubmit={handleSubmit}>
                {error && <p className='error'>As senhas precisam ser iguais</p>}            
                
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
                <button className='btn'>Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;
