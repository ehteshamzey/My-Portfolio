import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

interface CommentRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function toComment(row: CommentRow) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function GET() {
  const db = getDb();
  const rows = db
    .prepare(`SELECT id, name, message, created_at FROM comments ORDER BY created_at DESC`)
    .all() as CommentRow[];

  return NextResponse.json({ comments: rows.map(toComment) });
}

export async function POST(request: Request) {
  const body = await request.json();

  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const row: CommentRow = {
    id: randomUUID(),
    name: (rawName || "Anonymous").slice(0, 80),
    message: message.slice(0, 500),
    created_at: new Date().toISOString(),
  };

  const db = getDb();
  db.prepare(
    `INSERT INTO comments (id, name, message, created_at)
     VALUES (@id, @name, @message, @created_at)`,
  ).run(row);

  return NextResponse.json({ comment: toComment(row) }, { status: 201 });
}
