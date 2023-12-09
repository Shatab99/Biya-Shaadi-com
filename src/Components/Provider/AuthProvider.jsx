import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firbase.config";

export const AuthContext = createContext(null) 

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)
    const provider = new GoogleAuthProvider()

    const createUser = (email , password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const googleSign = ()=>{
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currenUser =>{
            console.log(currenUser)
            setUser(currenUser)
            setLoading(false)
        })

        return () =>{
            return unSubscribe()
        }

    },[])


    const info ={
        user, loading, createUser, logInUser, logOut,googleSign
    }


    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;