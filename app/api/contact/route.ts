import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "name, email, subject and message are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  db.prepare(
    `INSERT INTO contacts (id, name, email, subject, message, created_at)
     VALUES (@id, @name, @email, @subject, @message, @createdAt)`,
  ).run({
    id: randomUUID(),
    name: name.slice(0, 120),
    email: email.slice(0, 200),
    subject: subject.slice(0, 200),
    message: message.slice(0, 2000),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ message: "Message received. I'll get back to you soon." });
}
