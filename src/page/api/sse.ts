import { setTimeout } from "timers/promises";

export default async function handler() {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("<html><body>"));
      await setTimeout(500);
      controller.enqueue(encoder.encode("<ul><li>List Item 1</li>"));
      await setTimeout(500);
      controller.enqueue(encoder.encode("<li>List Item 2</li>"));
      await setTimeout(500);
      controller.enqueue(encoder.encode("<li>List Item 3</li></ul>"));
      await setTimeout(500);
      controller.enqueue(encoder.encode("</body></html>"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}