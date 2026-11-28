"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="min-h-screen bg-[#ddf6fe] p-8 text-black">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 text-center shadow-md">
        {user ? (
          <>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Welcome, {user.displayName || user.email}!
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={firebaseSignOut}
                className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Log out
              </button>
              <Link
                href="/week-10/shopping-list"
                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Shopping list
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Welcome to your shopping list
            </h1>
            <button
              type="button"
              onClick={gitHubSignIn}
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Log in with GitHub
            </button>
          </>
        )}
      </div>
    </main>
  );
}