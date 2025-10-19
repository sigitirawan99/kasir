"use client";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Refresh() {
  const [spinning, setSpinning] = useState(false);
  const handleClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };
  return (
    <Button
      variant="outline"
      className="cursor-pointer w-9 h-9"
      onClick={handleClick}
      disabled={spinning}
    >
      <RefreshCw className={spinning ? "animate-spin" : ""} />
    </Button>
  );
}
