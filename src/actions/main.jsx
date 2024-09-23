import { auth, provider, signInWithPopup } from "../firebase"; // Import the correct methods
import { SET_USER } from "./actionType";

// Action to set the user in the Redux store
export const setUser = (user) => ({
    type: SET_USER,
    user: user ? {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        // Include any other serializable fields you need
    } : null, // Set to null if user is not provided
});

// Sign-in function using Firebase
export const signInAPI = () => {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Use result.user for the dispatched user data
                const user = result.user;
                dispatch(setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    // Include any other serializable fields you need
                }));
            })
            .catch((error) => {
                console.error("Sign-in error:", error.message); // Handle errors during sign-in
            });
    };
}

// Function to get the authenticated user
export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    // Include any other serializable fields you need
                }));
            } else {
                dispatch(setUser(null)); // Dispatch null if no user is authenticated
            }
        });
    };
}

// Sign-out function
export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null)); // Clear user data in Redux store
        }).catch((error) => {
            console.log("Sign-out error:", error.message); // Handle sign-out errors
        });
    };
}
