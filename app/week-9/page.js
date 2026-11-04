"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import styles from "./auth.module.css";

export default function Page() {
  const { user, loading, pending, error, configured, gitHubSignIn, logOut } = useUserAuth();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← All assignments</Link>
        <section className={styles.card}>
          <p className={styles.eyebrow}>Joaquin Urbano · Week 9</p>
          <span className={styles.mark} aria-hidden="true">✓</span>
          <h1>{user ? `Welcome, ${user.displayName || "friend"}` : "A little planning, a good meal"}</h1>
          <p className={styles.description}>
            {user ? "Your groceries and a little dinner inspiration are ready" : "Keep the essentials together and find something good to cook"}
          </p>

          {loading ? <p className={styles.status} role="status">Checking your account…</p> : user ? (
            <div className={styles.actions}>
              <Link href="/week-9/shopping-list" className={styles.primaryButton}>Open my shopping list →</Link>
              <button type="button" onClick={logOut} disabled={pending} className={styles.secondaryButton}>
                {pending ? "Signing out…" : "Sign out"}
              </button>
            </div>
          ) : (
            <div className={styles.actions}>
              <button type="button" onClick={gitHubSignIn} disabled={pending || !configured} className={styles.primaryButton}>
                {pending ? "Connecting to GitHub…" : "Sign in with GitHub"}
              </button>
              <p className={styles.note}>
                {configured ? "Use your GitHub account to open the shopping list" : "Sign-in is being configured — please check back shortly"}
              </p>
            </div>
          )}
          {error && <p className={styles.error} role="alert">{error}</p>}
          <p className={styles.footer}>The everyday essentials, all in one place</p>
        </section>
      </div>
    </main>
  );
}
