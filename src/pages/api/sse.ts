export const config = {
  runtime: "edge",
};

export default async function handler() {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
     const id = setInterval(() => {
        controller.enqueue(new Date().toISOString());
      }, 500)
      setTimeout(() => {
        clearInterval(id)
        controller.close();
      },60 * 1000 * 10)
    }

  });

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}