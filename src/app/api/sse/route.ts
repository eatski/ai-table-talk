import { Firestore } from "@google-cloud/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const encoder = new TextEncoder();
  const store = new Firestore({
    apiKey: "AIzaSyByvvP8Rb_uQZnx5cb2BpZj8OvyUxuE2Rc",
    authDomain: "gagagaga-dev.firebaseapp.com",
    projectId: "gagagaga-dev",
    storageBucket: "gagagaga-dev.appspot.com",
    messagingSenderId: "442174624660",
    appId: "1:442174624660:web:c860937debeaf770b4b581",
    measurementId: "G-LS63C7GJ1T"
  });

  const readable = new ReadableStream({
    async start(controller) {
      const cleanup = store.collection("ai-table-talk").onSnapshot(() => {
        controller.enqueue(encoder.encode(new Date().toISOString()));
      });

      setTimeout(() => {
        cleanup();
        controller.close();
      }, 60 * 1000 * 10);
    },
  });

  return new NextResponse(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
