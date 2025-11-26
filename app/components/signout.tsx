"use client";

import { Button } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { signOut } from "next-auth/react";
import styles from '../styles/dashboard.module.css'

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    signOut();
  }

  return (
    <Button
      className={styles.signout}
      onClick={handleClick}
      loading={loading}
      spinner={<BeatLoader size={8} color="black" />}
    >
      Sign Out
    </Button>
  );
}
