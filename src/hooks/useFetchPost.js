// hooks
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import {
    doc, 
    getDoc
} from 'firebase/firestore';

export const useFetchPost = (docCollection, id) => {
    const [ document, setDocument ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    
    // memory leak
    const [ cancelled, setCancelled ] = useState(false);
    
    useEffect(() => {
        async function loadPost(){
            if(cancelled) return;

            setLoading(true);

            try{
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setError(error.message);
                setLoading(true);
            };
        };
        loadPost();
    }, [ docCollection, id, cancelled ]);

    // memory leak
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
};
