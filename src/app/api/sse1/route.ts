import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const readable = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode("Node"));
      setTimeout(() => {
        controller.close();
      }, 60 * 1000 * 10);
    },
  });

  return new NextResponse(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
