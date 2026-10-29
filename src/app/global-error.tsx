"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#020818", color: "#f5f5f7", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700 }}>Something went wrong.</h1>
            <button
              type="button"
              onClick={reset}
              style={{ marginTop: 24, padding: "12px 28px", borderRadius: 999, background: "#f5f5f7", color: "#020818", fontWeight: 600 }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
