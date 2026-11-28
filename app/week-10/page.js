"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  // Get the user and the login/logout functions from AuthContext
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      // The user closed the popup or clicked twice. Not a real error.
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      console.error("Login failed:", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#ddf6fe] p-8 text-black">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 text-center shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Shopping List App</h1>

        {!user ? (
          // Not logged in: show the login button only
          <button
            onClick={handleSignIn}
            className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700"
          >
            Login with GitHub
          </button>
        ) : (
          // Logged in: welcome message, shopping list link, and logout button
          <div className="space-y-4">
            <p className="text-lg">
              Welcome, {user.displayName || "GitHub user"} ({user.email})
            </p>

            <Link
              href="/week-10/shopping-list"
              className="block rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-600"
              style={{ color: "white" }}
            >
              Go to Shopping List
            </Link>

            <button
              onClick={handleSignOut}
              className="rounded-lg border border-gray-400 px-6 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}