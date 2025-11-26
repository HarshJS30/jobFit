"use client";

import { Button, Stack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Stack direction="row" gap="4" align="center">
      <Button onClick={() => signOut()} loadingText="Saving...">
        Sign Out
      </Button>
    </Stack>
  );
}
