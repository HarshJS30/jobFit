"use client";

import Image from 'next/image';
import img from '../../public/logoo.png';
import styles from '../styles/dashboard.module.css';
import React, { useState } from "react";
import NavDash from '../components/nav-dash';
import {useSession} from 'next-auth/react';
import SignOut from '../components/signout';

export default function PDFUpload() {
  const{data:session} = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formdata = new FormData(form);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formdata,
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.upload}>
      <div className={styles.navhead}>
        <Image src={img} alt='logo' width={100} height={100}></Image>
        <h2>JobFit</h2>
        <div className={styles.comp}>
          <NavDash />
          <SignOut />
        </div>
      </div>
      <h1>Welcome Back, {session?.user?.name}.</h1>
      <h1>Your resume deserves to be read.</h1>
      <form onSubmit={HandleSubmit} encType="multipart/form-data" className={styles.formm}>
        <input type="file" name="file" accept="application/pdf" required />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Upload"}
        </button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <p>Status: {response.status}</p>
          <p>Pages: {response.pages}</p>
          <p>Resume ID: {response.resumeId}</p>
          <p>Saved in DB: {response.saved ? "Yes" : "No"}</p>
          <p>Text: {response.text}</p>
        </div>
      )}
    </div>
  );
}
