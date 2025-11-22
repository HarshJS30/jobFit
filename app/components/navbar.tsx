"use client";

import Link from "next/link";
import styles from "../styles/nav.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/"><span className={styles.navText}>Home</span></Link></li>
        <li><Link href="/features"><span className={styles.navText}>Features</span></Link></li>
        <li><Link href="/pricing"><span className={styles.navText}>Pricing</span></Link></li>
        <li><Link href="/about"><span className={styles.navText}>About</span></Link></li>
        <li><Link href="/contact"><span className={styles.navText}>Contact</span></Link></li>
      </ul>
    </nav>
  );
}
