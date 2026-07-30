"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "name", type: "text", placeholder: "jane_doe" },
  { name: "email", label: "email", type: "email", placeholder: "jane@example.com" },
  { name: "subject", label: "subject", type: "text", placeholder: "let's build something" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
      {FIELDS.map(({ name, label, type, placeholder }) => (
        <div key={name} className="space-y-1.5">
          <label htmlFor={name} className="text-muted-foreground block">
            <span className="text-primary">$</span> {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            required
            placeholder={placeholder}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring w-full border px-3 py-2 font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>
      ))}

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-muted-foreground block">
          <span className="text-primary">$</span> message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="type your message here..."
          className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring w-full resize-none border px-3 py-2 font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary focus-visible:ring-ring w-full border px-4 py-2.5 font-mono text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "sending" ? "$ sending..." : "$ ./send.sh --execute"}
      </button>

      {status === "sent" && (
        <p className="text-primary text-xs">✓ message sent — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-destructive text-xs">
          ✗ something went wrong{errorMessage ? `: ${errorMessage}` : ""} — please try again.
        </p>
      )}
    </form>
  );
}
