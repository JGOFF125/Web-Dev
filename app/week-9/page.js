"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-emerald-900">Shopping List App</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-emerald-800">
            Welcome, {user.displayName} ({user.email})
          </p>
          <Link
            href="/week-9/shopping-list"
            className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Go to Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-100"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="rounded-md bg-emerald-600 px-6 py-3 text-lg text-white hover:bg-emerald-700"
        >
          Login with GitHub
        </button>
      )}
    </main>
  );
}