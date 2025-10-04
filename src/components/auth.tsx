"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const { replace } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      replace("/sign-in");
    }
  }, [replace]);
  return null;
}
