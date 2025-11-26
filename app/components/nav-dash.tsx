"use client";

import Link from "next/link";
import styles from "../styles/nav.module.css";

export default function NavDash() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/features"><span className={styles.navText}>Dashboard</span></Link></li>
        <li><Link href="/pricing"><span className={styles.navText}>Pricing</span></Link></li>
        <li><Link href="/about"><span className={styles.navText}>Your Applications</span></Link></li>
        <li><Link href="/contact"><span className={styles.navText}>Contact</span></Link></li>
      </ul>
    </nav>
  );
}
