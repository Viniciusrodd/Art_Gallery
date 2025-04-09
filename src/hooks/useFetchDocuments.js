
// hooks
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    QuerySnapshot
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, userid = null) => {
    const [ documents, setDocuments ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    
    // memory leak
    const [ cancelled, setCancelled ] = useState(false);
    
    useEffect(() => {
        async function loadData(){
            if(cancelled) return;

            setLoading(true);

            const collectionRef = collection(db, docCollection);
            try{
                let q;

                if(search){ // get documents by search for tags
                    q = await query(collectionRef, 
                        where('tags', 'array-contains', search), // "array-contains" is a method from firebase 
                        orderBy('createdAt', 'desc')
                    );
                }else{
                    q = await query(collectionRef, orderBy('createdAt', 'desc'));
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() // extracting all fields of document
                        // data() is a method avaible in objects "DocumentSnapshot" from Firestore
                    })));
                });

                setLoading(false);
            }
            catch(error){
                console.log(error);
                setError(error.message);

                setLoading(false);
            }
        };
        loadData();
    }, [ docCollection, documents, search, userid, cancelled ]);

    // memory leak
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};
