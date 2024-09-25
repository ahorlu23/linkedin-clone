import { auth, provider, signInWithPopup, storage } from "../firebase"; // Import the correct methods
import db from "../firebase";
import { SET_USER } from "./actionType";
import { collection, addDoc } from "firebase/firestore"; // Import necessary Firestore function
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import necessary functions

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

// Function to post an article
export function postArticleAPI(payload) {
    return (dispatch) => {
        if (payload.image != '') {
            const storageRef = ref(storage, `images/${payload.image.name}`); // Create a reference
            const upload = uploadBytesResumable(storageRef, payload.image); // Use uploadBytesResumable

            upload.on('state_changed', (snapshot) => {
                const progress = (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(`Progress: ${progress}%`);
                if (snapshot.state === 'running') {
                    console.log(`Progress: ${progress}%`);
                }
            }, (error) => {
                console.log(error.code);
            }, async () => {
                const downloadURL = await getDownloadURL(upload.snapshot.ref); // Get download URL

                const articlesRef = collection(db, 'articles'); // Reference to the 'articles' collection
                
                // Use a fallback value if payload.user.photoURL is undefined
                const actorImage = payload.user.photoURL || ''; // Default to empty string if undefined

                await addDoc(articlesRef, {
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: actorImage, // Ensure this field is never undefined
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description
                });
            });
        }
    };
}

