import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import initialaizeFirebase from './firebase.init';

initialaizeFirebase()
const useFirebase = () => {
    const googleProvider = new GoogleAuthProvider();

    const [user, setuser] = useState({})
    const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [admin, setAdmin] = useState(false)
    //register
    const registerUser = (email, password, name, location, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newuser = { email, displayName: name }
                setuser(newuser)
                //database
                saveUser(email, name, 'POST')
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });

                history.replace('/')
                setError('')
            })
            .catch((error) => {

                setError(error.message)

            })
            .finally(() => setIsLoading(false))

    }

    //loginUser

    const loginUser = (email, password, location, history) => {
        setIsLoading(true)


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const distination = location?.state?.from || '/'
                history.replace(distination)
                setError('')

            })
            .catch((error) => {
                setError(error.message)

            })
            .finally(() => setIsLoading(false))



    }
    //google
    const signInGoogle = (location, history) => {
        setIsLoading(true)

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                const distination = location?.state?.from || '/'
                history.replace(distination)
                setError('')
            }).catch((error) => {
                setError(error.message)
            })
            .finally(() => setIsLoading(false))

    }
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data?.admin))
    }, [user?.email])
    //logout
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    //observe
    useEffect(() => {
        const unsbscRibe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setuser(user)

            } else {
                setuser({})
            }
            setIsLoading(false)
        });
        return () => unsbscRibe
    }, [])



    const saveUser = (email, displayName, method) => {
        const user = { email, displayName }
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    return {
        user,
        admin,

        registerUser,
        loginUser,
        logOut,
        isLoading,
        signInGoogle,
        error
    }
};

export default useFirebase;