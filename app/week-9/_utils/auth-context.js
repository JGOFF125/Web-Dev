"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "./firebase";

const AuthContext = createContext(null);

function authErrorMessage(error) {
  switch (error.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "The sign-in window was closed — you can try again";
    case "auth/popup-blocked":
      return "Allow the sign-in popup in your browser, then try again";
    case "auth/network-request-failed":
      return "There was a connection problem — please try again";
    case "auth/account-exists-with-different-credential":
      return "This email already uses another sign-in method";
    case "auth/unauthorized-domain":
    case "auth/operation-not-allowed":
    case "auth/invalid-api-key":
    case "auth/configuration-not-found":
      return "GitHub sign-in needs to be configured for this app";
    default:
      return "Sign-in could not be completed — please try again";
  }
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebaseConfigured) return;

    function subscribeToUser() {
      try {
        const auth = getFirebaseAuth();
        // I wait for Firebase before showing the shopping list
        return onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }, (authError) => {
          setUser(null);
          setError(authErrorMessage(authError));
          setLoading(false);
        });
      } catch (authError) {
        setError(authErrorMessage(authError));
        setLoading(false);
      }
    }

    return subscribeToUser();
  }, []);

  async function gitHubSignIn() {
    if (pending || !firebaseConfigured) return;
    setPending(true);
    setError("");
    try {
      await signInWithPopup(getFirebaseAuth(), new GithubAuthProvider());
    } catch (authError) {
      setError(authErrorMessage(authError));
    } finally {
      setPending(false);
    }
  }

  async function logOut() {
    if (pending || !firebaseConfigured) return;
    setPending(true);
    setError("");
    try {
      await signOut(getFirebaseAuth());
      setUser(null);
    } catch {
      setError("Sign-out could not be completed — please try again");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, pending, error, configured: firebaseConfigured, gitHubSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUserAuth requires AuthContextProvider");
  return context;
}
