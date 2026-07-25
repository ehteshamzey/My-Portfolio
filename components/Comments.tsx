"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

type Status = "idle" | "sending" | "error";

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments ?? []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      form.reset();
      setStatus("idle");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <div className="border-border mt-6 border-t pt-6">
      <p className="text-muted-foreground mb-4 font-mono text-xs">
        <span className="text-primary">$</span> cat comments.log
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
        <div className="space-y-1.5">
          <label htmlFor="comment-name" className="text-muted-foreground block">
            <span className="text-primary">$</span> name{" "}
            <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="comment-name"
            name="name"
            type="text"
            placeholder="anonymous"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring w-full border px-3 py-2 font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="comment-message" className="text-muted-foreground block">
            <span className="text-primary">$</span> comment
          </label>
          <textarea
            id="comment-message"
            name="message"
            required
            rows={3}
            placeholder="leave a comment..."
            className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring w-full resize-none border px-3 py-2 font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary focus-visible:ring-ring w-full border px-4 py-2.5 font-mono text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {status === "sending" ? "$ posting..." : "$ ./post-comment.sh"}
        </button>

        {status === "error" && (
          <p className="text-destructive text-xs">
            ✗ couldn&apos;t post comment{errorMessage ? `: ${errorMessage}` : ""}.
          </p>
        )}
      </form>

      <div className="border-border mt-6 space-y-4 border-t pt-6">
        {!loaded && <p className="text-muted-foreground font-mono text-xs">loading comments...</p>}
        {loaded && comments.length === 0 && (
          <p className="text-muted-foreground font-mono text-xs">
            no comments yet — be the first to say hi.
          </p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="font-mono text-sm">
            <p>
              <span className="text-primary">{comment.name}</span>{" "}
              <span className="text-muted-foreground text-xs">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-foreground mt-1">{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
