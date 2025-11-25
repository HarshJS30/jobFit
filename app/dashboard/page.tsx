"use client";

import React, { useState } from "react";

export default function PDFUpload() {
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
    <>
      <h1>File Upload</h1>

      <form onSubmit={HandleSubmit} encType="multipart/form-data">
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
    </>
  );
}
