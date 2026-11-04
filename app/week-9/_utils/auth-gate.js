"use client";

import Link from "next/link";
import { useUserAuth } from "./auth-context";
import styles from "../auth.module.css";

export default function AuthGate() {
  const { loading } = useUserAuth();
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Joaquin Urbano · Week 9</p>
        <h1>{loading ? "One moment" : "Sign in to continue"}</h1>
        <p className={styles.description} role="status">
          {loading ? "Checking your account…" : "Sign in with GitHub to open the shopping list"}
        </p>
        {!loading && <Link href="/week-9" className={styles.primaryButton}>Go to sign in</Link>}
      </section>
    </main>
  );
}
