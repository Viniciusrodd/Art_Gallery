// importing db, just for the app knows we are using the config.js
import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);

    // CLEAN-UP FUNCTION 
    // for deal with memory leak problems:
    const [ cancelled, setCancelled ] = useState(false); // begins with 'false' whatever useEffect function
    function checkIfIsCancelled(){
        if(cancelled){
            return; 
        }
    };
    useEffect(() => {
        return () => setCancelled(true); //clean up function just when component get out of screen
    }, []);

    
    // authentication
    const auth = getAuth()// from firebase:


    // register user function
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);

        try{
            const { user } = await createUserWithEmailAndPassword( auth, data.email, data.password );
            await updateProfile(user, {
                displayName: data.displayName
            });
            setLoading(false);

            return user;
        }
        catch(error){
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;
            if(error.message.includes('Password')){
                systemErrorMessage = 'A senha precisa conter no minímo 6 caracteres.';
            }else if(error.message.includes('email-already')){
                systemErrorMessage = 'E-mail já cadastrado.'
            }else{
                systemErrorMessage = 'Ocorreu um erro! por favor, tente mais tarde...';
            }

            setError(systemErrorMessage);
            setLoading(false);
        };
    };


    // logout
    const logout = async () => {
        checkIfIsCancelled();
        await signOut(auth);
    };


    // login
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        }
        catch(error){
            let systemErrorMessage;

            if(error.message.includes("invalid-credential")){
                systemErrorMessage = "Dados inválidos.";
            }else{
                systemErrorMessage = "Houve um problema na conexão com o servidor, tente mais tarde."
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };


    return { auth, createUser, loading, error, logout, login };
}