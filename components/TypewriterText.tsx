"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

export function TypewriterText({
  words,
  typingSpeedMs = 70,
  deletingSpeedMs = 40,
  pauseMs = 1800,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeedMs,
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(timeout);
    }

    if (text.length > 0) {
      const timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeedMs);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setWordIndex((index) => (index + 1) % words.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs]);

  return (
    <span>
      {text}
      <span aria-hidden="true" className="terminal-cursor bg-primary h-[1em]" />
    </span>
  );
}
