import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function GET() {
  const readable = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode("Edge"));
      setTimeout(() => {
        controller.close();
      }, 60 * 1000 * 10);
    },
  });

  return new NextResponse(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
