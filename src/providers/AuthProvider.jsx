import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,sendEmailVerification,sendPasswordResetEmail } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

// const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // const updateUserProfile = (name, photo) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: photo
    //     });
    // }
    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL
        });
      };
    // Send email verification
    const sendVerificationEmail = () => {
        setLoading(true);
        if (!auth.currentUser) {
            throw new Error('No authenticated user found to send verification email.');
        }
        return sendEmailVerification(auth.currentUser);
    };
    const forgetPassword = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            console.log('Password reset email sent.');
            return 'Password reset email sent.';
        } catch (error) {
            setLoading(false);
            console.error('Failed to send password reset email:', error);
            throw error;
        }
    };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         if (currentUser) {
    //             // get token and store client
    //             const userInfo = { email: currentUser.email };
    //             axiosPublic.post('/jwt', userInfo)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token);
    //                         setLoading(false);
    //                     }
    //                 })
    //         }
    //         else {
    //             // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
    //             localStorage.removeItem('access-token');
    //             setLoading(false);
    //         }
            
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [axiosPublic])
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log('current User', currentUser);
                setIsVerified(currentUser.emailVerified); // Check email verification status
                setLoading(false);
            } else {
                setUser(null);
                setIsVerified(false);
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        sendVerificationEmail,
        isVerified,
        forgetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;