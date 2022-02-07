import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)
    
    useEffect(() => {
        if (isMounted) {
            // initialize auth
        const auth = getAuth()
        // call onAuth...
        // takes in a function with param of user
        onAuthStateChanged(auth, (user) => {
            // if user set logged in to true
            if (user) {
                setLoggedIn(true)
            }
            // only render if setCheckingStatus is false
            setCheckingStatus(false)
        })
        }
        
        return () => {
            isMounted.current = false
        }
}, [isMounted])

    return {loggedIn, checkingStatus}
}
