"use client";

import Image from 'next/image';
import img from '../../public/logoo.png';
import styles from '../styles/dashboard.module.css';
import React, { useState } from "react";
import NavDash from '../components/nav-dash';
import {useSession} from 'next-auth/react';
import SignOut from '../components/signout';
import { IoCloudUploadOutline } from "react-icons/io5";

export default function PDFUpload() {
  const{data:session} = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

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
        <Image src={img} alt='logo' width={100} height={100} className={styles.img}></Image>
        <h2>JobFit</h2>
        <div className={styles.comp}>
          <NavDash />
          <SignOut />
        </div>
      </div>
      <div className={styles.content}>
        <h1>Welcome Back, <span className={styles.name}>{session?.user?.name}.</span></h1>
        <h1>Let's Tailor your <span className={styles.resume}>Resume.</span></h1>
      </div>
      <form onSubmit={HandleSubmit} encType="multipart/form-data" className={styles.formm}>
        <IoCloudUploadOutline className={styles.cloud}/>
        <p className={styles.text}>Upload your resume here.</p>
        <input
          id="resumeInput"
          type="file"
          name="file"
          accept="application/pdf"
          required
          style={{ display: "none" }}
          onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "")}
        />
        <button
          type="button"
          onClick={() => document.getElementById("resumeInput")?.click()}
          className={styles.chooseBtn}
        >
          {selectedFileName ? selectedFileName : "Choose PDF"}
        </button>
        <br />
        <button type="submit" disabled={loading} className={styles.cta1}>
          {loading ? "Analyzing..." : "Upload Your Resume"}
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
